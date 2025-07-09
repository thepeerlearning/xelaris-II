import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

const Container = ({ children, className, ...rest }: ComponentProps<"div">) => {
  return (
    <div
      {...rest}
      className={cn("w-full max-w-[1280px] mx-auto px-4", className)}
    >
      {children}
    </div>
  );
};

export default Container;
