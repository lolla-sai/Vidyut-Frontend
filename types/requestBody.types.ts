import { CommercialFCSlab, ECSlab, IndustrialSlab } from "@/data/custom";

export type CreateOrUpdateDomesticRate = {
  rateType: "Domestic";
  slabs: Array<ECSlab>;
  fixedChargeRate: number;
  validTill: string;
};

export type CreateOrUpdateCommercialRate = {
  rateType: "Commercial";
  slabs: Array<ECSlab>;
  fixedChargeRate: Array<CommercialFCSlab>;
  validTill: string;
};

export type CreateOrUpdateIndustrialRate = {
  rateType: "Industrial";
  slabs: Array<IndustrialSlab>;
  fixedChargeRate: number;
  validTill: string;
};
