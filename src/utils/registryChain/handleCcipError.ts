import {
  Account,
  Address,
  BaseError,
  Chain,
  Hex,
  RawContractError,
  Transport,
  WalletClient,
} from "viem";

type CcipRequestParameters = {
  body: { data: Hex; signature: any; sender: Address };
  url: string;
};

async function ccipRequest({ body, url }: CcipRequestParameters): Promise<Response> {
  try {
    // IMPORTANT: Change made to gateway witout test. Should be handling POST with :{sender}/:{calldata}.json with server/this.handleRequest

    const res = await fetch(
      `${url.replace("/{sender}/{data}.json", "")}?source=elizaOS-plugin-entityID`,
      {
        body: JSON.stringify(body, (_, value) =>
          typeof value === "bigint" ? value.toString() : value,
        ),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function handleDBStorage({
  domain,
  url,
  message,
  wallet,
}: {
  domain: any;
  url: string;
  message: any;
  wallet: WalletClient<Transport, Chain, Account>;
}) {
  // This is to make sure `chainId` and `expirationTimestamp` get signed as strings
  domain.chainId += "";
  message.expirationTimestamp += "";

  const signature = await wallet.signTypedData({
    account: wallet.account,
    domain,
    message,
    types: {
      Message: [
        { name: "callData", type: "bytes" },
        { name: "sender", type: "address" },
        { name: "expirationTimestamp", type: "uint256" },
      ],
    },
    primaryType: "Message",
  });
  const requestResponse = await ccipRequest({
    body: {
      data: message.callData,
      signature: { message, domain, signature },
      sender: message.sender,
    },
    url,
  });

  return requestResponse;
}

function getRevertErrorData(err: unknown) {
  if (!(err instanceof BaseError)) return undefined;
  const error = err.walk() as RawContractError;
  return error?.data as { errorName: string; args: unknown[] };
}

export async function handleCcipError(wallet: WalletClient<Transport, Chain, Account>, err: Error) {
  const data = getRevertErrorData(err);

  switch (data?.errorName) {
    case "StorageHandledByOffChainDatabase": {
      const [domain, url, message] = data.args as any[];
      let urlToUse: string = url;
      if (process.env.NEXT_PUBLIC_RESOLVER_URL) {
        urlToUse = process.env.NEXT_PUBLIC_RESOLVER_URL;
      }
      const res: any = await handleDBStorage({
        domain,
        url: urlToUse,
        message,
        wallet,
      });
      if (res.status === 200) {
        const resBytes = await res.text();
        return resBytes;
      }
      throw new Error(`handleDBStorage returned res status ${res.status}`);
    }
    default:
      console.error("error registering domain: ", { err });
  }
}
