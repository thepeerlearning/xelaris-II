import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex  text-black  w-full min-w-0 h-10 border border-gray-100 outline-0 focus:outline-0  bg-white px-3 py-1 text-base  transition-colors outline-none placeholder:text-[#BDC1CA] focus:border-background disabled:cursor-not-allowed disabled:opacity-50 ",
        className
      )}
      {...props}
    />
  );
}

export { Input };
