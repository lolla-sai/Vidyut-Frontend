import axios from "axios";
import csv from "csvtojson";

export async function csvToJson(input: string): any {
  const jsonObjs = await csv().fromString(input);
  return jsonObjs;
}

export const getBills = async () => {
  const bills = (
    await axios.get("http://localhost:8080/api/billing/bills", {
      withCredentials: true,
    })
  ).data;

  console.log(bills.bills);
  return bills.bills;
};

export const getBill = async ({ queryKey }: { queryKey: any }) => {
  const [_, billId] = queryKey;
  const bill = (
    await axios.get(`http://localhost:8080/api/billing/bill/${billId.billId}`, {
      withCredentials: true,
    })
  ).data;

  console.log(bill);
  return bill.billData;
};

export const getComplaint = async ({ queryKey }: { queryKey: any }) => {
  const [_, complaintId] = queryKey;
  console.log(complaintId, "ComplaintId")
  const complaint = (
    await axios.get(`http://localhost:8080/api/admin/complaint-details/${complaintId.complaintId}`, {
      withCredentials: true,
      data: {
        complaintId: complaintId,
      },
    })
  ).data;

  console.log(complaint);
  return complaint.complaint;
};
