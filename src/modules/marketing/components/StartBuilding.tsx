import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface StudentProjectData {
  index: string;
  name: string;
  bgColor: string;
  label1: string;
  label2: string;
  text: React.ReactNode;
  imageUrl: string;
}

const data: StudentProjectData[] = [
  {
    index: "01",
    name: "Zoja Ivanovic (10 years old)",
    bgColor: "#34A853",
    label1: "Virus",
    label2: "Rule",
    imageUrl: "/assets/images/virus.png",
    text: (
      <>
        <p className="font-spectral italic text-white/70 mb-2">
          The problem I am addressing is that many people get sick without
          knowing the cause of their symptoms, like wheezing.{" "}
          <span className="font-semibold text-[#FFFEFAB2]">
            VirusRule helps users learn about viruses, vaccines, and virologists
          </span>{" "}
          through fun games and quizzes,” Zoja says.
        </p>
        <p className="text-white/70 mb-2">
          Inspired by her mom’s work as a virologist, Zoja is creating a playful
          and educational platform to help people better understand viruses and
          how to protect themselves.
        </p>
        <p className="text-white/70">
          <span className="font-semibold text-[#FFFEFAB2]">
            Her project makes science accessible and engaging
          </span>{" "}
          so everyone can take charge of their health.
        </p>
      </>
    ),
  },
  {
    index: "02",
    name: "Zoey Steve (14-year-old)",
    bgColor: "#4ECCCF",
    label1: "Zo",
    label2: "AI",
    imageUrl: "/assets/images/zoAi.png",
    text: (
      <>
        <p className="font-spectral italic text-white/70 mb-2">
          Inspired by her love for animals and curiosity about how computers
          understand images, she built a computer vision program that can
          accurately tell the difference between cats and dogs in photos.
        </p>
        <p className="text-white/70 mb-2">
          Zoey is a 14-year-old student learning Python programming and
          Artificial Intelligence. Inspired by her love for animals and
          curiosity about how computers understand images, she built a computer
          vision program that can accurately tell the difference between cats
          and dogs in photos.
        </p>
        <p className="text-white/70">
          Using Python and a basic machine learning model, she trained her
          program to recognize pet features and classify them within seconds.
          This project is part of her early journey into AI, where she's
          learning how technology can solve real-world problems.
        </p>
      </>
    ),
  },
  {
    index: "03",
    name: "Zach Richardson (14 years old)",
    bgColor: "#1F808D",
    label1: "Streamlined",
    label2: "Uniform Store",
    imageUrl: "/assets/images/store.png",
    text: (
      <>
        <p className="font-spectral italic text-white/70 mb-2">
          I started coding through game development, but I realized web
          development could solve real problems,” Zach explains. “I love the
          problem-solving aspect of coding – figuring out how to overcome
          challenges and make things work better.”
        </p>
        <p className="text-white/70 mb-2">
          Every school year, parent volunteers struggle to keep the uniform
          store website updated with new products, sizes, and inventory changes.
          This creates frustration for families trying to find what they need
          and extra work for busy volunteers.
        </p>
        <p className="text-white/70">
          <span className="font-semibold text-[#FFFEFAB2]">
            Zach is building a streamlined website for his school’s uniform
            store
          </span>{" "}
          that makes it incredibly easy for parent volunteers to update
          throughout the year.
        </p>
      </>
    ),
  },

  {
    index: "04",
    name: "Owen Li (11 years old)",
    bgColor: "#357AFF",
    label1: "Lifeline",
    label2: "Donations",
    imageUrl: "/assets/images/live-donation.png",
    text: (
      <>
        <p className="font-spectral italic text-white/70 mb-2">
          Millions of people struggle to pay for urgent medical care and
          hospital bills every year. Healthcare is often expensive, and many
          families are left without options.
        </p>
        <p className="text-white/70 mb-2">
          <span className="font-semibold text-[#FFFEFAB2]">
            Owen is building LifelineDonations
          </span>{" "}
          — a platform that connects generous donors with patients in need,
          helping them cover critical medical expenses.
        </p>
        <p className="text-white/70">
          His goal is to bring hope, healing, and financial relief to people
          during their most difficult times.
        </p>
      </>
    ),
  },

  {
    index: "05",
    name: "Fedir Piatoval  (12 years old)",
    bgColor: "#A83DEA",
    label1: "Toy",
    label2: "Cycle",
    imageUrl: "/assets/images/toyCycle.png",
    text: (
      <>
        <p className="font-spectral italic text-white/70 mb-2">
          Many families have toys they no longer use, but do not know how to
          sell them. At the same time, other families are looking for affordable
          toys to buy.
        </p>
        <p className="text-white/70 mb-2">
          Many families have toys they no longer use, but do not know how to
          sell them. At the same time, other families are looking for affordable
          toys to buy. My project, Toycycle, is a web app that helps solve both
          problems.
        </p>
        <p className="text-white/70">
          On Toycycle, people can buy or sell new and used toys. Buyers can
          choose the condition, price, and how far away the seller is. Sellers
          can upload photos of their toys and use a helpful guide to sell
          faster. Toycycle makes it easy for families to find great toys and
          give old ones a new home.
        </p>
      </>
    ),
  },
  {
    index: "06",
    name: "Nikolas Goncharova (11 years old)",
    bgColor: "#EB001B",
    label1: "Impact",
    label2: "Funds",
    imageUrl: "/assets/images/impact.png",
    text: (
      <>
        <p className="font-spectral italic text-white/70 mb-2">
          I realized a lot of people want to help but face obstacles when
          donating,” says Nikolas. “I built ImpactFund to make giving easier and
          more rewarding.
        </p>
        <p className="text-white/70 mb-2">
          Nikolas, a Canadian student, is passionate about helping people around
          the world. Inspired by learning about global challenges at school, he
          decided to create ImpactFund, a web app that makes it easy and
          meaningful to donate to important causes.
        </p>
        <p className="text-white/70">
          ImpactFund simplifies the donation process, allowing users to give in
          under 5 minutes and even set up automatic monthly contributions. A
          progress bar shows donors the impact of their support, helping build
          trust and transparency. “I realized a lot of people want to help but
          face obstacles when donating,” says Nikolas. “I built ImpactFund to
          make giving easier and more rewarding.”
        </p>
      </>
    ),
  },
];

const StudentProject = ({ project }: { project: StudentProjectData }) => {
  const { name, bgColor, label1, label2, text, imageUrl } = project;

  return (
    <section className="pb-10 lg:pb-[144px] md:pb-[216px] border-t border-[#FFFEFA80] pt-4 w-full bg-background sticky top-20">
      <Container>
        {/* Header */}
        <div className="w-full flex items-center gap-2">
          <span className="text-sm"> {project.index}</span>
          <p
            className="py-1 px-2 font-sans font-semibold text-sm text-light text-center"
            style={{ backgroundColor: bgColor }}
          >
            {name}
          </p>
        </div>

        {/* Content */}
        <div className="w-full flex flex-col md:flex-row md:justify-between mt-12 gap-20 max-lg:flex-col-reverse">
          {/* Left */}
          <div className="w-full md:w-[615px]">
            <h1 className="text-light font-sans font-medium text-[30.4px]  leading-[36.48px] ">
              {label1}{" "}
              <span className="font-serif italic font-light text-[35.9px]  leading-[35.15px]  -tracking-[0.72px] md:-tracking-[1.21px]">
                {label2}
              </span>
            </h1>

            <div className="mt-4 space-y-4">
              <div className="font-sans text-light-yellow-70 text-[14px] md:text-[14.98px] leading-[21px] md:leading-[22.68px] whitespace-pre-wrap">
                {text}
              </div>

              <p className="text-[#FFFEFA80] font-semibold text-[14.98px] leading-[22.68px]">
                {name}
              </p>

              <div className="mt-8">
                <Button variant="outline" asChild>
                  <Link href="/signup">Book A Free Class</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Image */}
          <div>
            <Image
              src={imageUrl}
              alt={`${label1} ${label2}`}
              width={615}
              height={540}
              className="w-full h-[306px] md:h-[540px] object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

const StudentBuildings = () => {
  return (
    <section className="relative">
      {/* Section Header */}
      <Container className="flex flex-col justify-center items-center py-20 text-center w-full">
        <h3 className="md:text-sm font-semibold text-[#FFFEFA80] mb-6">
          Software | AI | Blockchain
        </h3>
        <h1 className="mb-5 text-4xl lg:text-6xl text-white">
          See what our{" "}
          <span className="font-spectral ">
            students <br /> are building
          </span>
        </h1>
        <p className="max-w-lg text-center text-white/70">
          From mobile apps to AI tools to full web applications; these aren’t
          just classroom exercises. They’re real projects that showcase
          technical growth, creative thinking, and problem-solving.
        </p>
      </Container>

      {/* Projects */}
      <div>
        {data.map((project) => (
          <StudentProject key={project.name} project={project} />
        ))}
        <section className="sticky w-full bg-transparent h-[300px] max-lg:hidden"></section>
      </div>
    </section>
  );
};

export default StudentBuildings;
