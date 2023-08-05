import { CommercialFCSlab, ECSlab, IndustrialSlab } from "@/data/custom";

export type CreateDomesticRate = {
  rateType: "Domestic";
  slabs: Array<ECSlab>;
  fixedChargeRate: number;
  validTill: string;
};

export type CreateCommercialRate = {
  rateType: "Commercial";
  slabs: Array<ECSlab>;
  fixedChargeRate: Array<CommercialFCSlab>;
  validTill: string;
};

export type CreateIndustrialRate = {
  rateType: "Industrial";
  slabs: Array<IndustrialSlab>;
  fixedChargeRate: number;
  validTill: string;
};
