import Footer from "@/modules/marketing/components/footer";
import Navbar from "@/modules/marketing/components/navbar";
import ScrollProgress from "@/modules/marketing/components/scroll-progress";

import { PropsWithChildren } from "react";

const MarketingLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-[#1D1F24] flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollProgress />
    </div>
  );
};

export default MarketingLayout;
