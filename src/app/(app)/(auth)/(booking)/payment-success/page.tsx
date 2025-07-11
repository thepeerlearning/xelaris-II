import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="flex flex-col justify-center items-center text-black space-y-4 pt-20">
      <div className="bg-primary flex justify-center items-center p-5 rounded-full">
        <Check />
      </div>
      <h2 className="text-2xl">Registration Successful!</h2>
      <p className="text-center">
        Your child&apos;s class is confirmed! We&apos;ve sent all the details to
        your email, including the Zoom link and instructor information.
      </p>
      <Button asChild>
        <Link href="/">Back to homepage</Link>
      </Button>
    </div>
  );
};

export default SuccessPage;
