import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

const logos = [
  { name: "Microsoft", src: "/assets/logos/microsoft.svg" },
  { name: "Netflix", src: "/assets/logos/netflix.svg" },
  { name: "Shopify", src: "/assets/logos/shopify.svg" },
  { name: "Whatsapp", src: "/assets/logos/whatsapp.svg" },
  { name: "Tesla", src: "/assets/logos/tesla.svg" },
];

const leftLogos = [
  { name: "Company A", src: "/assets/logos/synthesis.svg" },
  { name: "Company B", src: "/assets/logos/springboard.svg" },
];

const ParentReviewsData = [
  {
    name: "Kateryna",
    country: "Canada",
    testimony:
      "What I appreciate most is how the projects are designed to be relatable to real-life situations. For instance, simulating a banking machine not only teaches coding but also introduces important finance concepts in a fun and interactive way. ",
    imageUrl: "/assets/images/testimonials/kateryna.png",
  },
  {
    name: "Alice",
    country: "Indonesia",
    testimony:
      "My son loves his coding classes at Xelaris. Sam is an excellent coding teacher that always pushes him to learn more and reach his full potential! Sam has a very wide range of experience with many coding languages and excels in teaching all of them.",
    imageUrl: "/assets/images/testimonials/alice.png",
  },
  {
    name: "Mohammed",
    country: "Dubai",
    testimony:
      "What I really love as a parent is getting those detailed session notes after each class. I can see exactly what she learned and worked on. Plus, the flexible scheduling has been a lifesaver. We can easily reschedule when things come up",
    imageUrl: "/assets/images/testimonials/mohammed.png",
  },
];

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen bg-gray-50 lg:bg-white max-w-screen overflow-x-clip">
      <div className="flex min-h-screen">
        {/* Left side - Form */}
        <div className="flex-1 bg-[#F2F0EC] p-6 lg:p-12">
          <div className="max-w-md mx-auto">
            <div className="mb-8 lg:mb-12">
              <Link href="/" className="text-xl flex items-center z-50">
                <Image
                  src="/assets/images/logo-black.svg"
                  height={37}
                  width={102}
                  alt="logo-icon"
                  sizes="100vw"
                  className="w-[102px] h-[32px]"
                />
              </Link>
            </div>
            {children}
          </div>
        </div>

        {/* Right side - Testimonials (hidden on mobile) */}
        <div className="hidden lg:block w-[60%] bg-background sticky top-0">
          <div className="flex flex-col gap-5 items-center px-10 py-14 h-full">
            <div className="grid grid-cols-3 gap-2">
              {ParentReviewsData.map((item, idx) => (
                <div key={idx} className="bg-[#383838] p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.imageUrl}
                      width={37}
                      height={37}
                      alt=""
                      className={cn("size-[37px] rounded-full")}
                    />
                    <div>
                      <p className="font-bold">{item.country}</p>
                      <p className="text-xs">{item.name}</p>
                    </div>
                  </div>
                  <Image
                    src={item.imageUrl}
                    width={212}
                    height={119}
                    alt=""
                    className={cn("w-full h-[119px] object-cover object-top", {
                      "object-[5%]": idx === 1,
                      "object-center": idx === 2,
                    })}
                  />
                  <p>{item.testimony}</p>
                </div>
              ))}
            </div>
            <div className=" flex flex-col max-lg:text-center mt-auto mb-10">
              <p className="text-sm text-center text-[#FFFEFA]/30 mb-4">
                FOUNDED BY FORMER TECH EDUCATORS FROM
              </p>
              <div className="flex gap-4 max-lg:justify-center">
                {leftLogos.map((logo, index) => (
                  <div
                    key={`left-${index}`}
                    className="flex-shrink-0 flex items-center justify-center text-white"
                  >
                    <Image
                      sizes="100vw"
                      height={24}
                      width={122}
                      src={logo.src || "/placeholder.svg"}
                      alt={logo.name}
                      className="h-6 w-auto"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden flex flex-col justify-center max-lg:text-center ">
              <p className="text-sm text-center  text-[#FFFEFA]/30 mb-4">
                TRUSTED BY PARENTS WORKING AT
              </p>

              {/* Marquee Container */}
              <div className="relative overflow-hidden">
                <div className="flex animate-marquee whitespace-nowrap gap-10">
                  {/* First set of logos */}
                  {logos.map((logo, index) => (
                    <div
                      key={`first-${index}`}
                      className="flex-shrink-0 flex items-center justify-center text-white"
                    >
                      <Image
                        sizes="100vw"
                        height={24}
                        width={122}
                        src={logo.src || "/placeholder.svg"}
                        alt={logo.name}
                        className="h-6 w-auto"
                      />
                    </div>
                  ))}
                  {/* Duplicate set for seamless loop */}
                  {logos.map((logo, index) => (
                    <div
                      key={`second-${index}`}
                      className="flex-shrink-0 flex items-center justify-center text-white"
                    >
                      <Image
                        sizes="100vw"
                        height={24}
                        width={122}
                        src={logo.src || "/placeholder.svg"}
                        alt={logo.name}
                        className="h-6 w-auto"
                      />
                    </div>
                  ))}
                  {logos.map((logo, index) => (
                    <div
                      key={`third-${index}`}
                      className="flex-shrink-0 flex items-center justify-center text-white"
                    >
                      <Image
                        sizes="100vw"
                        height={24}
                        width={122}
                        src={logo.src || "/placeholder.svg"}
                        alt={logo.name}
                        className="h-6 w-auto"
                      />
                    </div>
                  ))}
                  {logos.map((logo, index) => (
                    <div
                      key={`fourth-${index}`}
                      className="flex-shrink-0 flex items-center justify-center text-white"
                    >
                      <Image
                        sizes="100vw"
                        height={24}
                        width={122}
                        src={logo.src || "/placeholder.svg"}
                        alt={logo.name}
                        className="h-6 w-auto"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
