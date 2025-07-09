"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    title: "Top 2% Instructors",
    description:
      "We carefully select our instructors, choosing only the top 2% of applicants. This means your child learns from experts who are not only technically brilliant but also passionate about teaching and inspiring kids.",
  },
  {
    title: "Personalized Approach",
    description:
      "Every new student begins with a placement class designed not only to assess their coding skills, but to understand how they approach challenges, and solve problems. This helps us tailor their learning journey for the best results.",
  },
  {
    title: "Challenge-Based Progression",
    description:
      "Students tackle increasingly complex projects that mirror real-world problems. We intentionally design challenges that stretch their capabilities, creating the productive struggle that builds both technical skills and resilience.",
  },
  {
    title: "Industry Architecture",
    description:
      'Our curriculum are directly mapped to industry frameworks and professional tools. Students don\'t just learn "kid coding" - they develop mental models and workflows used by software teams at technology companies.',
  },
  {
    title: "Entrepreneurship",
    description:
      "Entrepreneurship at Xelaris isn't a course, it is a way of thinking. As part of their journey, every student builds a product that solves a real problem, launches it to the market, and actively acquires users, gaining invaluable experience.",
  },
  {
    title: "Measured Growth",
    description:
      "We track not just technical proficiency but the ability to decompose problems, recognize patterns, and come up with solutions. Our assessment framework provides parents with visibility into their child's growth.",
  },
];

const WhatMakesUsDifferent = () => {
  return (
    <Container>
      <section className="py-20">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <div className="w-full space-y-[18px]">
            <h2 className="font-sans font-normal text-[32.66px] leading-[36px] tracking-normal text-[#F2F0EB] md:text-[51.1px] md:leading-[70px]">
              What Makes Us <br />
              <span className="font-serif font-light italic text-[32.66px] leading-[36px] tracking-normal text-[#F2F0EB] md:text-[60.3px] md:leading-[70px]">
                Different?
              </span>
            </h2>
            <p className="font-sans font-normal text-[16px] leading-[22.4px] tracking-normal text-[#F2F0EB] md:text-[22px] md:leading-[30px]">
              This isn’t school. It’s a launchpad for the next generation of
              innovators.
            </p>
            <Button asChild>
              <Link href="/signup">Book A Free Class</Link>
            </Button>
          </div>

          <div className="flex mt-[67px] gap-[35.5px]">
            {/* Timeline dots and lines */}
            <div className="flex flex-col justify-center items-center max-lg:hidden">
              {[...Array(6)].map((_, i) => (
                <div key={i}>
                  <div className="w-[12px] h-[12px] bg-[#F2F1EB] rounded-full" />
                  {i < 5 && (
                    <div className="h-[214.2px] bg-white w-[2px] ml-[5px]" />
                  )}
                </div>
              ))}
            </div>

            {/* Feature list */}
            <div className="space-y-[10px]">
              {features.map(({ title, description }, index) => (
                <div
                  key={title + index}
                  className="bg-[#F2F0EB] w-full md:w-[601px] h-fit md:h-[205px] py-[25px] px-[30px] max-lg:sticky max-lg:top-24 max-lg:border max-lg:border-background"
                  style={{ zIndex: 10 + index + 1, top: 80 + index * 10 }}
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <h1 className="w-full md:w-[186px] h-fit md:h-[96px] font-sans font-bold text-[22.75px] leading-[24.2px] tracking-normal text-[#1D1F24]">
                      {title}
                    </h1>
                    <p className="w-[267px] font-sans font-normal text-[14.5px] leading-[19.2px] -tracking-[0.32px] text-[#1D1F24]">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default WhatMakesUsDifferent;
