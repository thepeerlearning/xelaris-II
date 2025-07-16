"use client";

import Container from "@/components/container";
import Image from "next/image";
import { useState } from "react";

const SchoolFaq = ({
  faqs,
  faqText,
  image,
}: {
  faqs: { title: string; items: string[] }[];
  faqText: string;
  image: string;
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleShowAllFaqs = () => {
    setShowAllFaqs(!showAllFaqs);
  };

  const initialFaqCount = 3;
  const displayedFaqs = showAllFaqs ? faqs : faqs.slice(0, initialFaqCount);
  const shouldShowReadMore = faqs.length > initialFaqCount;

  return (
    <section className=" py-10 lg:py-20">
      <Container className="py-20 flex lg:flex-row gap-4 lg:gap-10 flex-col max-lg:flex-col-reverse relative">
        <div className="lg:w-1/2 w-full grow-0 max-md:max-h-[298px] h-full max-lg:max-h-[400px] overflow-hidden lg:sticky top-24">
          <Image
            src={image}
            alt="panel discussion"
            height={550.8}
            width={648}
            className="w-full object-cover h-full max-lg:object-top"
          />
        </div>
        <div className="lg:w-1/2 flex flex-col lg:px-20">
          <div className="w-full space-y-4">
            <div className="space-y-4 border-b border-primary pb-10">
              <h5 className="font-medium text-3xl text-white w-full lg:text-5xl">
                What You&apos;ll{" "}
                <span className="font-spectral text-4xl lg:text-6xl">
                  Learn
                </span>
              </h5>
              <p className="text-white/70 text-sm">{faqText}</p>
            </div>

            <div className="space-y-4">
              {displayedFaqs.map((faq, index) => (
                <div key={index} className="border-b border-[#FFFEFA]/20">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full cursor-pointer flex justify-between items-center py-4 text-left font-semi-bold"
                  >
                    <h3 className="font-medium text-lg text-[#FFFEFA] pr-4">
                      {faq.title}
                    </h3>
                    <svg
                      className={`w-5 h-5 text-primary transition-transform duration-200 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {openIndex === index && (
                    <div className="pb-4 animate-fadeIn">
                      <ul className="list-disc list-inside space-y-1 text-white/70 text-sm leading-relaxed">
                        {faq.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}

              {shouldShowReadMore && (
                <div className="pt-4">
                  <button
                    onClick={toggleShowAllFaqs}
                    className="text-primary text-sm font-medium hover:underline transition-all duration-200"
                  >
                    {showAllFaqs ? "Read Less" : "Read More"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SchoolFaq;
