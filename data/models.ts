import {
  Breakage,
  ConsumerType,
  ECSlab,
  IndustrialFCSlab,
  IndustrialSlab,
  SubsidyDoc,
} from "./custom";
// import { Timestamp } from "@google-cloud/firestore";

export type Admin = {
  userName: string;
  password: string;
};

export type User = {
  consumerId: number;
  phoneNumber: number;
  fullName: string;
  address: string;
  meterNumber: number;
  sactionedLoad: number;
  consumerType: ConsumerType;
  subsidyRate: number;
  status: "Approved" | "Rejected" | "Pending";
  rejectionReason: string | null;
  phase: 1 | 3;
  supportingDocs: Array<SubsidyDoc>;
};

// export type Billing = {
//   consumerDocId: string;
//   meterNumber: number;
//   currentDate: Timestamp;
//   paymentDate: Timestamp;
//   previousReading: number;
//   consumption: number;
//   breakage: Array<Breakage>;
//   fixedCharge: number;
//   meterRent: number;
//   totalCharge: number;
//   paid: boolean;
//   rateDocId: string;
// };

export type CommercialFCSlab = {
  range: "0-20" | "20-90";
  pricePerUnit: number;
};

export type DomesticRate = {
  slabs: Array<ECSlab>;
  fixedChargeRate: number;
  latest: boolean;
  validFrom: Date;
  validTill: Date;
  type: "Domestic";
};

export type IndustrialRate = {
  slabs: Array<IndustrialSlab>;
  fixedChargeRate: number;
  latest: boolean;
  validFrom: Date;
  validTill: Date;
  type: "Industrial";
};

export type CommercialRate = {
  slabs: Array<ECSlab>;
  fixedChargeRate: Array<CommercialFCSlab>;
  latest: boolean;
  validFrom: Date;
  validTill: Date;
  type: "Commercial";
};

export type Complaint = {
  description: string;
  status: string;
  billDocId: string;
};
