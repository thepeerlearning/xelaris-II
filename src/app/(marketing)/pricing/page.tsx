import Container from "@/components/container";
import { Check } from "lucide-react";
import BookClassButton from "../_components/bookClass";

const PricingData = [
  {
    duration: "45 minutes private lesson once a week ",
    price: "$220",
    timeframe: "month",
    benefits: [
      "Weekly 45-minute 1:1 classes with an experienced instructor.",
      "Personalized lessons tailored to your child`s pace and learning style.",
      "Detailed instructor session notes outlining what was covered in each class",
      "Dedicated, responsive support available 7 days a week.",
      "Easily reschedule your child`s class anytime.",
      "Course certification.",
    ],
  },
  {
    duration: "1 hour private lesson once a week",
    price: "$275",
    timeframe: "month",
    benefits: [
      "Weekly 60-minute 1:1 classes with an experienced instructor.",
      "Personalized lessons tailored to your child`s pace and learning style.",
      "Detailed instructor session notes outlining what was covered in each class",
      "Dedicated, responsive support available 7 days a week.",
      "Easily reschedule your child`s class anytime.",
      "Course certification.",
    ],
  },
  {
    duration: "45 minutes private lesson twice a week",
    price: "$350",
    timeframe: "month",
    benefits: [
      "Twice-weekly 45-minute 1:1 classes with an experienced instructor.",
      "Personalized lessons tailored to your child`s pace and learning style.",
      "Detailed instructor session notes outlining what was covered in each class",
      "Dedicated, responsive support available 7 days a week.",
      "Easily reschedule your child`s class anytime.",
      "Course certification.",
    ],
  },
  {
    duration: "1 hour private lesson twice a week",
    price: "$450",
    timeframe: "month",
    benefits: [
      "Twice-weekly 60-minute 1:1 classes with an experienced instructor.",
      "Personalized lessons tailored to your child`s pace and learning style.",
      "Detailed instructor session notes outlining what was covered in each class",
      "Dedicated, responsive support available 7 days a week.",
      "Easily reschedule your child`s class anytime.",
      "Course certification.",
    ],
  },
];

const PricingPage = () => {
  return (
    <section className="bg-white">
      <Container className="py-20">
        <div className="items-center flex flex-col mb-7">
          <h1 className="text-6xl text-black mb-6">Pricing</h1>
          <p className="text-black max-w-2xl mx-auto text-center">
            Our goal is to provide the finest online tech education available.
            When you enrol your child, their tuition includes much more than
            just the standard class experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PricingData.map(({ duration, price, timeframe, benefits }) => (
            <div key={duration} className="w-full bg-background">
              <div className="p-6">
                <h2 className="font-bold text-lg mb-4">{duration}</h2>
                <h1 className="font-bold text-3xl my-6">
                  {price} <span className="text-sm">per/{timeframe}</span>
                </h1>

                <BookClassButton />
              </div>

              <hr />

              <div className="p-6">
                <h3 className="mb-4">What’s included</h3>
                <div className="space-y-2">
                  {benefits.map((item, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Check size={20} />
                      <p className="flex-1">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PricingPage;
