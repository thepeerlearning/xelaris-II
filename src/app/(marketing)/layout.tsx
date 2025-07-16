import FloatingChat from "@/components/FloatingChat";
import ScrollProgress from "@/components/scroll-progress";

import { PropsWithChildren } from "react";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

const MarketingLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-[#1D1F24] flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollProgress />
      <FloatingChat />
    </div>
  );
};

export default MarketingLayout;
