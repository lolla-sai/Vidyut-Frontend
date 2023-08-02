import {
  Breakage,
  ConsumerType,
  ECSlab,
  IndustrialFCSlab,
  IndustrialSlab,
} from "./custom";
import { Timestamp } from "@google-cloud/firestore";

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
  phase: 1 | 3;
  supportingDocs: Array<string>;
};

export type Billing = {
  consumerDocId: string;
  meterNumber: number;
  currentDate: Timestamp;
  paymentDate: Timestamp;
  previousReading: number;
  consumption: number;
  breakage: Array<Breakage>;
  fixedCharge: number;
  meterRent: number;
  totalCharge: number;
  paid: boolean;
  rateDocId: string;
};

export type DomesticRate = {
  slabs: Array<ECSlab>;
  fixedChargeRate: number;
};

export type IndustrialRate = {
  slabs: Array<ECSlab>;
  fixedChargeRate: number;
};

export type CommercialRate = {
  slabs: Array<IndustrialSlab>;
  fixedChargeRate: Array<IndustrialFCSlab>;
};

export type Complaint = {
  description: string;
  status: string;
  billDocId: string;
};
