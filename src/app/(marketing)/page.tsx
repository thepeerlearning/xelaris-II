import BuildRealProjects from "@/modules/marketing/components/home/BuildRealProject";
import HomeHero from "@/modules/marketing/components/home/hero";
import MathScores from "@/modules/marketing/components/home/MathScore";
import Partners from "@/modules/marketing/components/home/Partners";
import StudentSpotLight from "@/modules/marketing/components/home/StudentSpotlight";
import WhatWeTeach from "@/modules/marketing/components/home/WhatWeTeach";
import StudentBuildings from "@/modules/marketing/components/StartBuilding";
import Testimonial from "@/modules/marketing/components/Testimonial";
import WhatMakesUsDifferent from "@/modules/marketing/components/what-makes-us-different";

const HomePage = () => {
  return (
    <>
      <HomeHero />
      <Partners />
      <BuildRealProjects />
      <WhatWeTeach />
      <StudentBuildings />
      <MathScores />
      <StudentSpotLight />
      <Testimonial />
      <WhatMakesUsDifferent />
    </>
  );
};

export default HomePage;
