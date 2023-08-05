export type ConsumerType = "Domestic" | "Commercial" | "Industrial";
type SubsidyDoc = { fileName: string; url: string };

export type Breakage = {
  quantity: number;
  rate: number;
  amount: number;
};

export type ECSlab = {
  range: "0-100" | "101-200" | "201-300" | "301-400" | ">400";
  pricePerUnit: number;
};

export type IndustrialSlab = {
  range: "0-500" | ">500";
  pricePerUnit: number;
};

export type CommercialFCSlab = {
  range: "0-20" | "20-90";
  pricePerUnit: number;
};
