import { IndustrialSlab } from "./custom";
import { CommercialRate, DomesticRate, IndustrialRate, User } from "./models";

export const domesticSlabs: DomesticRate = {
  slabs: [
    {
      range: "0-100",
      pricePerUnit: 1.71,
    },
    {
      range: "101-200",
      pricePerUnit: 2.11,
    },
    {
      range: "201-300",
      pricePerUnit: 2.71,
    },
    {
      range: "301-400",
      pricePerUnit: 2.99,
    },
    {
      range: ">400",
      pricePerUnit: 3.41,
    },
  ],
  fixedChargeRate: 15,
  latest: true,
  validFrom: new Date("2022-09-24"),
  validTill: new Date("2023-09-22"),
};

export const industrialSlabs: IndustrialRate = {
  slabs: [
    {
      range: "0-500",
      pricePerUnit: 4.71,
    },
    {
      range: ">500",
      pricePerUnit: 6.11,
    },
  ],
  fixedChargeRate: 15,
  latest: true,
  validFrom: new Date("2022-09-24"),
  validTill: new Date("2023-09-22"),
};

export const commercialSlab: CommercialRate = {
  slabs: [
    {
      range: "0-100",
      pricePerUnit: 1.71,
    },
    {
      range: "101-200",
      pricePerUnit: 2.11,
    },
    {
      range: "201-300",
      pricePerUnit: 2.71,
    },
    {
      range: "301-400",
      pricePerUnit: 2.99,
    },
    {
      range: ">400",
      pricePerUnit: 3.41,
    },
  ],
  fixedChargeRate: [
    {
      range: "0-20",
      pricePerUnit: 40,
    },
    {
      range: "20-90",
      pricePerUnit: 60,
    },
  ],
  latest: true,
  validFrom: new Date("2022-09-24"),
  validTill: new Date("2023-09-22"),
};

export const applications: User[] = [
  {
    consumerId: 432239449033,
    phoneNumber: 9404181639,
    status: "Approved",
    fullName: "Sai Sameer Kumar Lolla",
    address: "H.No. 488, Dongorim, Navelim, Salcete, South Goa, Goa",
    meterNumber: 23894333,
    sactionedLoad: 3.9,
    consumerType: "domestic",
    subsidyRate: 0,
    phase: 1,
    rejectionReason: null,
    supportingDocs: [],
  },
  {
    consumerId: 322394493323,
    phoneNumber: 88275039639,
    address: "Shop No. 129, Vodle Bhat, Taleigao, Panaji - Goa",
    fullName: "Sairaj Kapadi",
    phase: 1,
    meterNumber: 38943334,
    consumerType: "commercial",
    sactionedLoad: 11.9,
    status: "Rejected",
    rejectionReason: null,
    subsidyRate: 0,
    supportingDocs: [
      { fileName: "aadhar.pdf", url: "https://docs.google.com/12333rf3" },
      { fileName: "pan.pdf", url: "https://docs.google.com/f12333rf23" },
    ],
  },
  {
    consumerId: 223944903332,
    phoneNumber: 9557373883,
    address: "Cuncolim, Goa",
    fullName: "M/S JSW Steels Ltd",
    phase: 3,
    meterNumber: 47388339,
    consumerType: "industrial",
    sactionedLoad: 39,
    status: "Pending",
    rejectionReason: "Documents are not proper.",
    subsidyRate: 29.3,
    supportingDocs: [
      { fileName: "aadhar.pdf", url: "https://docs.google.com/12333rf3" },
      { fileName: "pan.pdf", url: "https://docs.google.com/f12333rf23" },
    ],
  },
];
