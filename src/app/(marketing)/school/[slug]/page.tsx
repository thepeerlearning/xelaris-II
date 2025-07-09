import { schoolData } from "@/data";
import SchoolFaq from "@/modules/marketing/components/SchoolFaq";
import SchoolHero from "@/modules/marketing/components/SchoolHero";
import StudentBuildings from "@/modules/marketing/components/StartBuilding";
import Testimonial from "@/modules/marketing/components/Testimonial";
import WhatMakesUsDifferent from "@/modules/marketing/components/what-makes-us-different";
import { notFound } from "next/navigation";

const SchoolPage = async ({ params }: { params: string }) => {
  const slug = await params.slug;
  const data = schoolData.find((item) => item.id === slug);

  if (!data) {
    return notFound();
  }
  return (
    <>
      <SchoolHero
        videoUrl={data.videoUrl}
        title={data.title}
        description={data.description}
      />

      <SchoolFaq faqs={data.faqs} faqText={data.faqText} />
      <StudentBuildings />
      <Testimonial />
      <WhatMakesUsDifferent />
    </>
  );
};

export default SchoolPage;
