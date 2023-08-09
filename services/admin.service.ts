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

  return {
    fetchedConsumers: applications.fetchedConsumers,
    stats: applications.stats,
  };
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

export const registerConsumer = (requestBody: any) =>
  axios
    .post("http://localhost:8080/api/consumer/createConsumer", requestBody, {
      withCredentials: true,
    })
    .then((res) => res.data);

export const getComplaints = async () => {
  const complaints = (
    await axios.get("http://localhost:8080/api/admin/fetchComplaints", {
      withCredentials: true,
    })
  ).data;

  console.log(complaints.complaints, "COMPLAINTS");
  return complaints.complaints;
};
