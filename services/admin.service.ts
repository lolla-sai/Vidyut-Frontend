import axios from "axios";

export const getCurrentRates = async () => {
  const rates = (
    await axios.get("http://localhost:8080/api/admin/currentRates", {
      withCredentials: true,
    })
  ).data;

  return rates.rates;
};
