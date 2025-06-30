import { cn } from "@/lib/utils";
import React from "react";

interface LeftTextProps {
  className?: string;
  text: string;
}

export default function LeftText({ className, text }: LeftTextProps) {
  return (
    <p className={cn(className)}>
      <span className="sr-only">Gonzalo Agostino - section: {text}</span>
      <span aria-live="polite">{text}</span>
    </p>
  );
}
