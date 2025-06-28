import { cn } from "@/lib/utils";
import React from "react";

function JaLogo({ className }: { className?: string }) {
  return <p className={cn(className, "p-4")}>JaLogo</p>;
}

export default JaLogo;
