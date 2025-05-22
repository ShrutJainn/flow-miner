"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IParamProps, ITaskParam } from "@/types/appNode";
import React, { useId, useState } from "react";

function StringParam({ param, value, updateNodeParamValue }: IParamProps) {
  const id = useId(); //generate random id
  const [internalValue, setInternalValue] = useState(value);
  return (
    <div className=" space-y-1 p-1 w-full">
      <Label htmlFor={id} className=" text-xs flex flex-col gap-1">
        {param.name}
        {param.required && <p className=" text-red-400 px-2">*</p>}
        <Input
          id={id}
          className=" text-xs"
          value={internalValue}
          placeholder="Enter value here"
          onChange={(e) => setInternalValue(e.target.value)}
          onBlur={(e) => updateNodeParamValue(e.target.value)}
        />
        {param.helperText && (
          <p className=" text-muted-foreground px-2">{param.helperText}</p>
        )}
      </Label>
    </div>
  );
}

export default StringParam;
