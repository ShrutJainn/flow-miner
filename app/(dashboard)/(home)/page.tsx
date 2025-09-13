"use client";

import { getPeriods } from "@/actions/analytics/getPeriods";
import React, { Suspense } from "react";
import PeriodSelector from "./_components/PeriodSelector";
import { TPeriod } from "@/types/analytics";
import { Skeleton } from "@/components/ui/skeleton";
import { getStatusCardValues } from "@/actions/analytics/getStatusCardValues";

function Home({
  searchParams,
}: {
  searchParams: { month?: string; year?: string };
}) {
  const currDate = new Date();
  const { month, year } = searchParams;
  const period: TPeriod = {
    month: month ? parseInt(month) : currDate.getMonth(),
    year: year ? parseInt(year) : currDate.getFullYear(),
  };
  return (
    <div className=" flex flex-1 flex-col h-full">
      <div className=" flex justify-between">
        <h1 className=" text-3xl font-bold">Home</h1>
        <Suspense fallback={<Skeleton className=" w-[180px] h-[40px] " />}>
          <PeriodsSelectorWrapper selectedPeriod={period} />
        </Suspense>
      </div>
      <StatsCards selectedPeriod={period} />
    </div>
  );
}
async function StatsCards({ selectedPeriod }: { selectedPeriod: TPeriod }) {
  const data = await getStatusCardValues(selectedPeriod);
  return <pre>{JSON.stringify(data, null, 4)}</pre>;
}
async function PeriodsSelectorWrapper({
  selectedPeriod,
}: {
  selectedPeriod: TPeriod;
}) {
  const periods = await getPeriods();
  return <PeriodSelector periods={periods} selectedPeriod={selectedPeriod} />;
  // return <pre>{JSON.stringify(periods, null, 4)}</pre>;
}

export default Home;
