import Container from "@/components/container";
import Image from "next/image";

const TeamData = [
  {
    name: "Mia Liam",
    role: "Software Developer",
    imageUrl: "/assets/images/people/mia_liam.png",
  },
  {
    name: "Priya Mehta",
    role: "Scheduling Coordinator",
    imageUrl: "/assets/images/people/priya_mehta.png",
  },
  {
    name: "Sushi Uji",
    role: "Product Designer",
    imageUrl: "/assets/images/people/sushi_uji.png",
  },
  {
    name: "Casweeney",
    role: "Blockchain Engineer",
    imageUrl: "/assets/images/people/casweeney.png",
  },
  {
    name: "Emilia Zhang",
    role: "AI/ML Engineer",
    imageUrl: "/assets/images/people/emilia_zhang.png",
  },
  {
    name: "Amelia Yates",
    role: "Software Developer",
    imageUrl: "/assets/images/people/amelia_yates.png",
  },
  {
    name: "Jasmine Ryan",
    role: "Software Developer",
    imageUrl: "/assets/images/people/jasmine_ryan.png",
  },
  {
    name: "Aisha Abdulkadi",
    role: "Software Developer",
    imageUrl: "/assets/images/people/aisha_abdulkadi.png",
  },
  {
    name: "Daniela Reyes",
    role: "Software Developer",
    imageUrl: "/assets/images/people/daniela_reyes.png",
  },
  {
    name: "Malik Gwandu",
    role: "Product Designer",
    imageUrl: "/assets/images/people/malik_gwandu.png",
  },
  {
    name: "Sophie Patel",
    role: "Product Designer",
    imageUrl: "/assets/images/people/sophie_patel.png",
  },
  {
    name: "Eliana Luca",
    role: "AI/ML Engineer",
    imageUrl: "/assets/images/people/eliana_luca.png",
  },
  {
    name: "Sam Eseyin",
    role: "Product Designer",
    imageUrl: "/assets/images/people/sam_eseyin.png",
  },
  {
    name: "Jordan Smith",
    role: "Software Developer",
    imageUrl: "/assets/images/people/jordan_smith.png",
  },
];

const AboutUsPage = () => {
  return (
    <section className="overflow-hidden pb-[90px]">
      <div className="h-[488px] p-[64px] gap-[20px] w-full flex flex-col items-center justify-center bg-[url('/assets/images/aboutBg.png')] bg-cover bg-no-repeat bg-center md:min-h-[500px] lg:min-h-[650px] px-[20px]">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl">
            About{" "}
            <span className="font-spectral text-4xl md:text-5xl lg:text-6xl">
              Xelaris
            </span>
          </h1>
          <p className="max-w-2xl text-center  lg:text-xl">
            Founded by former educators from Synthesis and Springboard, Xelaris
            is led by a team deeply passionate about technology, education, and
            the intersection of both.
          </p>
          <p className="max-w-2xl text-center lg:text-xl">
            We are educators, designers, and engineers who believe in pushing
            boundaries to create engaging, innovative, and meaningful learning
            experiences tailored specifically for kids and teens.
          </p>
        </div>
      </div>

      <Container className="py-8 lg:py-20">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl">
            Our{" "}
            <span className="text-4xl md:text-5xl lg:text-6xl font-spectral">
              Team
            </span>
          </h1>
        </div>

        <p className="mt-6 mb-10 text-sm md:text-base lg:text-lg max-w-2xl">
          We believe there`s nothing more powerful than using your skills to
          make a difference. Meet the team who are building the foundation of
          Xelaris.
        </p>

        <div className="grid md:grid-cols-3  lg:grid-cols-5 gap-2">
          {TeamData.map((team, index) => (
            <div key={index} className="border-[1px] border-[#E2E3D3] w-full">
              <Image
                src={team.imageUrl}
                alt={team.name}
                height={247}
                width={372}
                className="w-full h-[247px] md:w-[264px] md:h-[202px]"
              />
              <div className="w-full h-[100px] py-[16px] px-[14px] gap-[8px] flex flex-col">
                <h1 className="text-2xl text-primary">{team.name}</h1>
                <p className="font-sans font-normal text-[16px] leading-[24px] -tracking-[0.48] align-middle text-light">
                  {team.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AboutUsPage;
