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
    console.log(err);
    throw new Error(err.message);
  }
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
  try {
    const [_, consumerId] = queryKey;
    const applications = (
      await axios.get(
        `http://localhost:8080/api/admin/consumerApplicationDetails/${consumerId.consumerId}`,
        {
          withCredentials: true,
        }
      )
    ).data;

    console.log(applications);
    return applications.consumerApplication;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
};
