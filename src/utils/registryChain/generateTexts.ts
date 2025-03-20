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
];

export const generateTexts = (fields: Record<string, any>): { key: string; value: string }[] => {
  // THE PURPOSE OF THIS FUNCTION IS TO CONVERT THE ENTIRE DATA OBJECT COLLECTED INTO TEXT RECORDS FOR ALL RESOLVER TYPES
  const texts: { key: string; value: string }[] = [];
  fields.partners?.forEach((partner: any, idx: any) => {
    const partnerKey = `partner__[${idx}]__`;
    for (const field of Object.keys(partner)) {
      if (partner[field].type === "address" || field === "wallet__address") {
        if (!isAddress(partner[field])) {
          texts.push({ key: partnerKey + field, value: zeroAddress });
        } else {
          texts.push({
            key: partnerKey + field,
            value: partner[field],
          });
        }
      } else if (partner[field].type === "boolean") {
        texts.push({
          key: partnerKey + field,
          value: partner[field] ? "true" : "false",
        });
      } else if (partner[field].type === "Date") {
        const m = new Date().getMonth() + 1;
        const d = new Date().getDate();
        const y = new Date().getFullYear();
        texts.push({ key: partnerKey + field, value: `${y}-${m}-${d}` });
      } else if (field !== "roles") {
        texts.push({
          key: partnerKey + field,
          value: partner[field],
        });
      } else if (partner[field]) {
        for (const role of partner[field]) {
          texts.push({ key: `${partnerKey}is__${role}`, value: "true" });
        }
      }
    }
  });

  for (const key of Object.keys(fields)) {
    if (key !== "partners" && DISPLAY_KEYS.includes(key)) {
      texts.push({ key: key, value: fields[key] });
    }
  }

  return texts;
};
