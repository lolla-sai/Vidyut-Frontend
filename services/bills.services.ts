import csv from "csvtojson";

export async function csvToJson(input: string): any {
  const jsonObjs = await csv().fromString(input);
  return jsonObjs;
}
