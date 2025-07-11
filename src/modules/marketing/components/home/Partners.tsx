"use client";

import Container from "@/components/container";
import Image from "next/image";

// Sample logo data - you can replace these with actual logo URLs
const logos = [
  { name: "Microsoft", src: "/assets/logos/microsoft.svg" },
  { name: "Netflix", src: "/assets/logos/netflix.svg" }, // If intentional duplicate, it's fine
  { name: "Shopify", src: "/assets/logos/shopify.svg" },
];

const leftLogos = [
  { name: "Company A", src: "/assets/logos/synthesis.svg" },
  { name: "Company B", src: "/assets/logos/springboard.svg" },
];

const Partners = () => {
  return (
    <section className="py-16">
      <Container className="flex flex-col lg:flex-row gap-5">
        {/* Left Div - Static Content */}
        <div className="lg:w-1/2 flex flex-col max-lg:text-center">
          <p className="text-sm  text-[#FFFEFA]/30 mb-4">
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

        {/* Right Div - Marquee Content */}
        <div className="overflow-hidden flex flex-col justify-center max-lg:text-center lg:w-1/2">
          <p className="text-sm  text-[#FFFEFA]/30 mb-4">
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
      </Container>
    </section>
  );
};

export default Partners;
