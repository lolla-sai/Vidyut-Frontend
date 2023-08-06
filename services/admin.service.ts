import axios, { AxiosError } from "axios";

export const getCurrentRates = async () => {
  const rates = (
    await axios.get("http://localhost:8080/api/billing/currentRates", {
      withCredentials: true,
    })
  ).data;

  return rates.rates;
};

export const getCurrentApplicationList = async () => {
  const applications = (
    await axios.get("http://localhost:8080/api/admin/fetchConsumers", {
      withCredentials: true,
    })
  ).data;

  return applications.fetchedConsumers;
};

export const getConsumerApplication = async ({
  queryKey,
}: {
  queryKey: any;
}) => {
  const [_, consumerId] = queryKey;
  const applications = (
    await axios.get(
      `http://localhost:8080/api/admin/consumerApplicationDetails/${consumerId.consumerId}`,
      {
        withCredentials: true,
      }
    )
  ).data;

  return applications.consumerApplication;
};
