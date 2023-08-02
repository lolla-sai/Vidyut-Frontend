"use client";

import SidebarWithHeader from "@/components/Sidebar";
import { User } from "@/data/models";
import { Box } from "@chakra-ui/react";
import React from "react";

function ApplicationDetails({ params }: { params: { consumerId: number } }) {
  let consumerDetail: User = {
    consumerId: 223944903332,
    status: "Pending",
    phoneNumber: 557373883,
    fullName: "M/S JSW Steels Ltd",
    address: "Cuncolim, Goa",
    meterNumber: 47388339,
    sactionedLoad: 39,
    consumerType: "industrial",
    subsidyRate: 29.3,
    phase: 3,
    supportingDocs: [
      "https://docs.google.com/12333rf3",
      "https://docs.google.com/12333rf3",
    ],
  };

  return (
    <SidebarWithHeader>
      <Box>
        <div>{params.consumerId} </div>
      </Box>
    </SidebarWithHeader>
  );
}

export default ApplicationDetails;
