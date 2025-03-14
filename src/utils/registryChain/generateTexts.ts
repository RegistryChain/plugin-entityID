import { isAddress, zeroAddress } from "viem";

export const DISPLAY_KEYS = [
  "LEI",
  "name",
  "address",
  "description",
  "url",
  "location",
  "avatar",
  "entity__name",
  "entity__address",
  "entity__registrar",
  "entity__type",
  "entity__description",
  "entity__purpose",
  "entity__formation__date",
  "entity__lockup__days",
  "entity__additional__terms",
  "entity__selected__model",
  "entity__lookup__number",
  "entity__code",
  "entity__arbitrator",
  "partner__[0]__name",
  "partner__[0]__type",
  "partner__[0]__wallet__address",
  "partner__[0]__physical__address",
  "partner__[0]__DOB",
  "partner__[0]__is__manager",
  "partner__[0]__is__signer",
  "partner__[0]__lockup",
  "partner__[0]__shares",
  "partner__[1]__name",
  "partner__[1]__type",
  "partner__[1]__wallet__address",
  "partner__[1]__physical__address",
  "partner__[1]__DOB",
  "partner__[1]__is__manager",
  "partner__[1]__is__signer",
  "partner__[1]__lockup",
  "partner__[1]__shares",
  "partner__[2]__name",
  "partner__[2]__type",
  "partner__[2]__wallet__address",
  "partner__[2]__physical__address",
  "partner__[2]__DOB",
  "partner__[2]__is__manager",
  "partner__[2]__is__signer",
  "partner__[2]__lockup",
  "partner__[2]__shares",
  "partner__[3]__name",
  "partner__[3]__type",
  "partner__[3]__wallet__address",
  "partner__[3]__physical__address",
  "partner__[3]__DOB",
  "partner__[3]__is__manager",
  "partner__[3]__is__signer",
  "partner__[3]__lockup",
  "partner__[3]__shares",
  "partner__[4]__name",
  "partner__[4]__type",
  "partner__[4]__wallet__address",
  "partner__[4]__physical__address",
  "partner__[4]__DOB",
  "partner__[4]__is__manager",
  "partner__[4]__is__signer",
  "partner__[4]__lockup",
  "partner__[4]__shares",
  "partner__[5]__name",
  "partner__[5]__type",
  "partner__[5]__wallet__address",
  "partner__[5]__physical__address",
  "partner__[5]__DOB",
  "partner__[5]__is__manager",
  "partner__[5]__is__signer",
  "partner__[5]__lockup",
  "partner__[5]__shares",
];

export const generateTexts = (fields: any) => {
  // THE PURPOSE OF THIS FUNCTION IS TO CONVERT THE ENTIRE DATA OBJECT COLLECTED INTO TEXT RECORDS FOR ALL RESOLVER TYPES
  const texts: any[] = [];
  fields.partners.forEach((partner: any, idx: any) => {
    const partnerKey = `partner__[${idx}]__`;
    for (const field in Object.keys(partner)) {
      if (partner[field].type === "address" || field === "wallet__address") {
        if (!isAddress(partner[field]?.setValue)) {
          texts.push({ key: partnerKey + field, value: zeroAddress });
        } else {
          texts.push({
            key: partnerKey + field,
            value: partner[field]?.setValue,
          });
        }
      } else if (partner[field].type === "boolean") {
        texts.push({
          key: partnerKey + field,
          value: partner[field]?.setValue ? "true" : "false",
        });
      } else if (partner[field].type === "Date") {
        const m = new Date().getMonth() + 1;
        const d = new Date().getDate();
        const y = new Date().getFullYear();
        texts.push({ key: partnerKey + field, value: `${y}-${m}-${d}` });
      } else if (field !== "roles") {
        texts.push({
          key: partnerKey + field,
          value: partner[field]?.setValue,
        });
      } else if (partner[field]?.setValue) {
        for (const role in partner[field]?.setValue) {
          texts.push({ key: `${partnerKey}is__${role}`, value: "true" });
        }
      }
    }
  });

  for (const key in Object.keys(fields)) {
    if (key !== "partners" && DISPLAY_KEYS.includes(key)) {
      texts.push({ key: key, value: fields[key]?.setValue });
    }
  }

  return texts;
};
