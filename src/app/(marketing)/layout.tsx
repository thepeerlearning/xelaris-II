import Footer from "@/modules/marketing/components/footer";
import Navbar from "@/modules/marketing/components/navbar";

import { PropsWithChildren } from "react";

const MarketingLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </>
  );
};

export default MarketingLayout;
