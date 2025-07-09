import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HeroVideoPlayer from "./HeroVideoPlayer";

const SchoolHero = ({
  title,
  description,
  videoUrl,
}: {
  title: string;
  description: string;
  videoUrl: string;
}) => {
  const words = title.split(" ");
  const main = words.slice(0, -1).join(" "); // all words except last
  const sub = words[words.length - 1]; // last word only
  const formattedMain =
    main.charAt(0).toUpperCase() + main.slice(1).toLowerCase();
  return (
    <section className=" min-h-[640px] lg:min-h-[calc(100%-80px)] relative overflow-hidden lg:py-20">
      <Container className="flex items-center h-full gap-10 lg:flex-row flex-col py-8">
        <div className="flex flex-col lg:w-[40%]">
          <div>
            <h1 className="mb-5 text-4xl md:text-5xl  font-medium">
              {formattedMain} <br />{" "}
              <span className="font-spectral font-light italic lowercase">
                {sub}
              </span>
            </h1>
            <p className="text-white/70 mb-5">{description}</p>

            <div className="flex gap-2">
              <Button asChild>
                <Link href="/signup">Book A Free Class</Link>
              </Button>
            </div>
          </div>
        </div>
        <HeroVideoPlayer src={videoUrl} />
      </Container>
    </section>
  );
};

export default SchoolHero;
