import axios, { AxiosError } from "axios";

export const getCurrentRates = async () => {
  try {
    const rates = (
      await axios.get("http://localhost:8080/api/billing/currentRates", {
        withCredentials: true,
      })
    ).data;

    return rates.rates;
  } catch (err: any) {
    console.log(err)
    throw new Error(err.message);
  }
};
