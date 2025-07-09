import Container from "@/components/container";
import Image from "next/image";

const BuildRealProjects = () => {
  return (
    <section>
      <Container className="py-20  flex lg:flex-row gap-4 lg:gap-10 flex-col max-lg:flex-col-reverse">
        <div className="lg:w-1/2 w-full shrink-0 max-md:h-[298px] max-lg:h-[400px] overflow-hidden">
          <Image
            src="/assets/images/boy-seating.png"
            alt="panel discussion"
            height={550.8}
            width={648}
            className="w-full object-cover h-full max-lg:object-top"
          />
        </div>
        <div className="lg:w-1/2 flex flex-col justify-center items-center lg:px-20">
          <div className="w-full space-y-[13px]">
            <h5 className="font-semibold text-[#FFFEFA]/70 w-full">
              Software | AI | Blockchain
            </h5>
            <div className="w-full">
              <h1 className="font-medium text-3xl lg:text-6xl">
                Build real <br className="max-lg:hidden" />{" "}
                <span className="font-spectral">projects</span>
              </h1>
            </div>

            <p className="mt-2 text-[#FFFEFA]/70">
              No prior knowledge needed. We introduce students to software
              engineering, AI and blockchain through guided, practical learning.
              While building real-world projects takes time, within a few
              months, our students gain solid foundations and start working on
              exciting projects that showcase their growing abilities.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BuildRealProjects;
