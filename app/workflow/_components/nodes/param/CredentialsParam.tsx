"use client";

import { getCredentialsForUser } from "@/actions/credentials/getCredentialsForUser";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IParamProps, ITaskParam } from "@/types/appNode";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useId, useState } from "react";

function CredentialsParam({
  param,
  value,
  updateNodeParamValue,
  disabled,
}: IParamProps) {
  const id = useId();
  const query = useQuery({
    queryKey: ["credentials-for-user"],
    queryFn: () => getCredentialsForUser(),
    refetchInterval: 10000,
  });
  console.log("credentials : ", query?.data);
  return (
    <div className=" flex flex-col gap-1 w-full">
      <Label htmlFor={id} className=" text-xs">
        {param.name}
        {param.required && <p className=" text-red-400 px-2">*</p>}
      </Label>
      <Select
        onValueChange={(value) => updateNodeParamValue(value)}
        defaultValue={value}
      >
        <SelectTrigger className=" w-full">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Credentials</SelectLabel>
            {query?.data?.map((credential: any) => (
              <SelectItem key={credential.id} value={credential.value}>
                {credential.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default CredentialsParam;
