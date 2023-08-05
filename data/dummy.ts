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
  validFrom: "2022-09-24",
  validTill: "2023-09-22",
  type: "Domestic",
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
  validFrom: "2022-09-24",
  validTill: "2023-09-22",
  type: "Industrial",
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
  validFrom: "2022-09-24",
  validTill: "2023-09-22",
  type: "Commercial",
};

export const applications: User[] = [
  {
    phoneNumber: 9404181639,
    email: "saisameer.lolla@gmail.com",
    status: "Approved",
    fullName: "Sai Sameer Kumar Lolla",
    address: "H.No. 488, Dongorim, Navelim, Salcete, South Goa, Goa",
    meterNumber: 23894333,
    sanctionedLoad: 3.9,
    consumerType: "Domestic",
    subsidyRate: 0,
    phase: 1,
    rejectionReason: null,
    supportingDocs: [],
    approved: false,
  },
  {
    email: "saisameer.lolla@gmail.com",
    phoneNumber: 88275039639,
    address: "Shop No. 129, Vodle Bhat, Taleigao, Panaji - Goa",
    fullName: "Sairaj Kapadi",
    phase: 1,
    meterNumber: 38943334,
    consumerType: "Commercial",
    sanctionedLoad: 11.9,
    status: "Rejected",
    rejectionReason: null,
    subsidyRate: 0,
    approved: false,
    supportingDocs: [
      { fileName: "aadhar.pdf", url: "https://docs.google.com/12333rf3" },
      { fileName: "pan.pdf", url: "https://docs.google.com/f12333rf23" },
    ],
  },
  {
    email: "saisameer.lolla@gmail.com",
    phoneNumber: 9557373883,
    address: "Cuncolim, Goa",
    fullName: "M/S JSW Steels Ltd",
    phase: 3,
    approved: false,
    meterNumber: 47388339,
    consumerType: "Industrial",
    sanctionedLoad: 39,
    status: "Pending",
    rejectionReason: "Documents are not proper.",
    subsidyRate: 29.3,
    supportingDocs: [
      { fileName: "aadhar.pdf", url: "https://docs.google.com/12333rf3" },
      { fileName: "pan.pdf", url: "https://docs.google.com/f12333rf23" },
    ],
  },
];
