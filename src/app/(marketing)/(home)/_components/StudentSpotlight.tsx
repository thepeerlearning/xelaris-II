import Container from "@/components/container";
import VideoPlayer from "@/components/video/VideoPlayer";

const spotlightData = [
  {
    thumbnail: "/assets/images/spotlight/1.png",
    videoUrl:
      "https://res.cloudinary.com/djeoaylbe/video/upload/v1751487485/a35fc9f1-943d-46ff-83c6-6db0df02cfed_qqiea5.mov",
    text: (
      <>
        We&apos;re so proud of our student Fedir, who took 2nd place in{" "}
        <span className="font-sans font-bold md:text-[18px] text-[#091717]">
          Computer Science at the National BETA State Convention!
        </span>{" "}
        Fedir put in months of hard work preparing for this competition, and
        seeing his dedication and problem-solving skills pay off at the state
        level makes us incredibly proud.
      </>
    ),
  },
  {
    thumbnail: "/assets/images/spotlight/2.png",
    videoUrl:
      "https://res.cloudinary.com/djeoaylbe/video/upload/v1751487159/WhatsApp_Video_2025-06-20_at_13.25.54_1_psrji2.mov",
    text: (
      <>
        We’re so proud of our student Zach! He did an amazing job presenting his
        AI project at the camp. His parent were truly impressed by how confident
        and clear he was throughout his presentation.{" "}
        <strong>
          As his mom said, they attribute his success to the support and
          guidance he’s receiving through our program.
        </strong>
      </>
    ),
  },
  {
    thumbnail: "/assets/images/spotlight/3.png",
    videoUrl:
      "https://res.cloudinary.com/djeoaylbe/video/upload/v1751486914/WhatsApp_Video_2025-07-01_at_14.44.02_on2yfy.mp4",
    text: (
      <>
        We&apos;re so proud of our student Zach! He did an amazing job
        presenting his AI project at the camp. His parents were truly impressed
        by how confident and clear he was throughout his presentation.{" "}
        <span className="font-sans font-bold md:text-[18px] text-[#091717]">
          As his mom said, they attribute his success to the support and
          guidance he&apos;s receiving through our program.
        </span>
      </>
    ),
  },
];

const SpotlightCard = ({
  videoUrl,
  text,
  thumbnail,
}: {
  videoUrl: string;
  text: React.ReactNode;
  thumbnail: string;
}) => (
  <div className="bg-primary w-full  h-fit md:h-[562px] p-5 md:p-10 space-y-[32px]">
    <VideoPlayer
      thumbnailUrl={thumbnail}
      className="h-[174.38px] md:h-[338.39px] w-full"
      videoUrl={videoUrl}
    />
    <div className="w-full  h-fit">
      <p className="font-sans font-normal text-[16px] leading-[24px] text-center text-[#091717] md:text-[18px] md:leading-[28px] md:font-helvetica">
        {text}
      </p>
    </div>
  </div>
);

const StudentSpotLight = () => {
  return (
    <section>
      <Container className="w-full h-fit flex md:justify-between md:flex-row flex-col py-10 lg:py-20 relative gap-10">
        <div className="w-full md:w-[50%] h-fit space-y-[16px] md:sticky md:top-[30%] self-start">
          <div className="w-full md:w-[399px]">
            <h1 className="font-sans font-bold text-[28px] leading-[36.4px] text-[#F2F0EB] md:text-[60.3px] md:leading-[64px]">
              Our Student{" "}
              <span className="font-serif font-light italic text-[#F3F3ED]">
                Spotlights
              </span>
            </h1>
          </div>
          <div className="opacity-70 w-full md:w-[400px]">
            <p className="font-sans text-[16px] leading-[22.4px] text-[#F3F3ED] md:text-[17.8px] md:leading-[25.2px]">
              Celebrating the hard work, talent, and growth of our students as
              they excel in competitions and present their innovative projects.
            </p>
          </div>
        </div>

        <div className="space-y-8 md:w-[50%] w-full">
          {spotlightData.map((item, index) => (
            <SpotlightCard
              key={index}
              videoUrl={item.videoUrl}
              text={item.text}
              thumbnail={item.thumbnail}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StudentSpotLight;
