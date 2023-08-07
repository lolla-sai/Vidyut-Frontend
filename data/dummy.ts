import { IndustrialSlab } from "./custom";
import {
  Billing,
  CommercialRate,
  DomesticRate,
  IndustrialRate,
  User,
} from "./models";

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

export const bills: (Billing & {
  meterRent: number;
  subsidyDiscount: number;
  totalEC: number;
  dueDate: string;
  billId: number;
  fullName: string;
})[] = [
  {
    paid: false,
    billId: 13333939404,
    latest: true,
    consumerDocId: "cbGTD4GhrctI1DiuadK6",
    sanctionedLoad: 3.9,
    consumption: 1300,
    currentDate: "08-05-2023",
    currentReading: 1300,
    meterNumber: 2,
    paymentDate: "08-20-2023",
    rateDocId: "MC03ERK3VSkdcLj3YxEs",
    fixedCharge: {
      amount: 176,
      calculation: "45 * 3.9",
    },
    meterRent: 15,
    previousReading: 0,
    totalCharge: 5922,
    breakage: [
      {
        amount: 355,
        quantity: 100,
        rate: 3.55,
      },
      {
        amount: 435,
        quantity: 100,
        rate: 4.35,
      },
      {
        amount: 485,
        quantity: 100,
        rate: 4.85,
      },
      {
        amount: 390,
        quantity: 100,
        rate: 3.9,
      },
      {
        amount: 4725,
        quantity: 900,
        rate: 5.25,
      },
    ],
    consumerType: "Commercial",
    fullName: "Sai Lolla",
    totalEC: 6390,
    dueDate: "8-7-2023",
    subsidyDiscount: 658,
  },
];
