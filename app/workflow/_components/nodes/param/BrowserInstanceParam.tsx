"use client";

import { IParamProps } from "@/types/appNode";
import React from "react";

function BrowserInstanceParam({ param }: IParamProps) {
  return <p className=" text-xs">{param.name}</p>;
}

export default BrowserInstanceParam;
