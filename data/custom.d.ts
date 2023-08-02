import "express-session";
export type ConsumerType = "domestic" | "commercial" | "industrial";

export type Breakage = {
  quantity: number;
  rate: number;
  amount: number;
};

export type ECSlab = {
  range: "0-100" | "101-200" | "201-300" | "301-400" | ">400";
  pricePerUnit: number;
  upperLimit: number;
};

export type IndustrialSlab = {
  range: "0-500" | ">500";
  pricePerUnit: number;
};

export type IndustrialFCSlab = {
  range: "0-20" | "20-90";
  pricePerUnit: number;
};

type UserSession = {
  userDocId: string | null;
  loggedIn: boolean;
};

declare module "express-session" {
  interface SessionData {
    userData: UserSession;
  }
}
