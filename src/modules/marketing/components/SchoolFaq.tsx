"use client";

import Container from "@/components/container";
import Image from "next/image";
import { useState } from "react";

const SchoolFaq = ({
  faqs,
  faqText,
}: {
  faqs: { question: string; answer: string }[];
  faqText: string;
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section>
      <Container className="py-20 flex lg:flex-row gap-4 lg:gap-10 flex-col max-lg:flex-col-reverse">
        <div className="lg:w-1/2 w-full grow-0 max-md:max-h-[298px] h-full max-lg:max-h-[400px] overflow-hidden">
          <Image
            src="/assets/images/boy-seating.png"
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
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-[#FFFEFA]/20">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full cursor-pointer flex justify-between items-center py-4 text-left font-semi-bold"
                  >
                    <h3 className="font-medium text-lg text-[#FFFEFA] pr-4">
                      {faq.question}
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
                      <p className="text-white/70 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SchoolFaq;
