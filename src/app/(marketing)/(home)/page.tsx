import StudentBuildings from "@/components/StartBuilding";
import Testimonial from "@/components/Testimonial";
import WhatMakesUsDifferent from "@/components/what-makes-us-different";
import BuildRealProjects from "./_components/BuildRealProject";
import HomeHero from "./_components/hero";
import MathScores from "./_components/MathScore";
import Partners from "./_components/Partners";
import StudentSpotLight from "./_components/StudentSpotlight";
import WhatWeTeach from "./_components/WhatWeTeach";

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
