import Container from "@/components/container";
import Image from "next/image";

const MathScores = () => {
  return (
    <section className="">
      <Container className="border-t border-[#515151] py-10 lg:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between  gap-10 lg:gap-20 flex-1">
          {/* Text Content */}
          <div className="space-y-5 lg:w-[40%]">
            <h1 className="text-4xl lg:text-4xl">
              From 75th to 95th <br /> Percentile: Coding Boosted{" "}
              <br className="hidden lg:block" /> Our Student{" "}
              <span className="font-spectral text-3xl lg:text-5xl italic">
                Zach&apos;s <br className="hidden lg:block" /> Math Scores by
                20%
              </span>
            </h1>

            <p className="text-white/70 text-base">
              Zach&apos;s MAP math scores went up 20% from last fall a
              phenomenal leap from the 75th to the 95th percentile in math. We
              believe this improvement is due to all the coding and
              problem-solving work. The MAP test is taken biannually to
              benchmark students in U.S.-based schools. Notably, Zach’s highest
              scoring area was problem-solving a clear impact of learning to
              code.
            </p>

            <h3 className="">Alice Richardson</h3>
          </div>

          {/* Image Section */}
          <div className="lg:flex-1    relative h-[543px] lg:h-[604px] w-full md:max-w-[50%]">
            <Image
              src="/assets/images/zac1.png"
              alt="Zach learning"
              fill
              sizes="100vw"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MathScores;
