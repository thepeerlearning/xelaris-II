import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HeroVideoPlayer from "../HeroVideoPlayer";

const HomeHero = () => {
  return (
    <section className=" min-h-[640px] lg:min-h-[calc(100%-80px)] relative overflow-hidden lg:py-20">
      <Container className="flex items-center h-full gap-10 lg:flex-row flex-col py-8">
        <div className="flex flex-col lg:w-[40%]">
          <div>
            <h1 className="mb-5 text-4xl md:text-5xl  font-medium   capitalize leading-14">
              The best place <br className="hidden lg:block" /> for kids/teens{" "}
              to learn tech skills. <br />
              <span className="text-primary italic font-semibold underline font-spectral">
                Guaranteed.
              </span>
            </h1>
            <p className="text-white/70 mb-5">
              We&apos;re laying the foundation for the next generation{" "}
              <br className="hidden lg:flex" /> of pioneers in Software
              Engineering, AI, and Blockchain.
            </p>
            <p className="text-white mb-14 flex items-center gap-1">
              {" "}
              <svg
                width="32"
                height="25"
                viewBox="0 0 32 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.25 15.8052C14.9424 15.8052 17.125 13.6226 17.125 10.9302C17.125 8.23779 14.9424 6.05518 12.25 6.05518C9.55761 6.05518 7.375 8.23779 7.375 10.9302C7.375 13.6226 9.55761 15.8052 12.25 15.8052Z"
                  stroke="#FFFEF9"
                  strokeWidth="3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M18.5701 6.23667C19.2406 6.04775 19.9438 6.00471 20.6324 6.11045C21.3209 6.2162 21.9788 6.46827 22.5617 6.84968C23.1446 7.23109 23.6391 7.733 24.0117 8.32156C24.3843 8.91016 24.6265 9.57181 24.7219 10.2619C24.8173 10.9519 24.7637 11.6544 24.5648 12.322C24.3658 12.9896 24.026 13.6068 23.5685 14.1321C23.1109 14.6573 22.5461 15.0785 21.912 15.3671C21.278 15.6557 20.5895 15.805 19.8929 15.8051"
                  stroke="#FFFEF9"
                  strokeWidth="3"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.5 19.3111C6.26138 18.2281 7.27215 17.3442 8.44698 16.734C9.62182 16.1238 10.9262 15.8053 12.2501 15.8052C13.5739 15.8051 14.8784 16.1236 16.0532 16.7337C17.2281 17.3438 18.239 18.2277 19.0005 19.3106"
                  stroke="#FFFEF9"
                  strokeWidth="3"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.8928 15.8052C21.2168 15.8042 22.5215 16.1223 23.6965 16.7325C24.8714 17.3427 25.8821 18.227 26.6429 19.3106"
                  stroke="#FFFEF9"
                  strokeWidth="3"
                  stroke-linejoin="round"
                />
              </svg>
              <span className="font-bold text-lg lg:text-2xl">
                {" "}
                1-on-1 online live classes
              </span>
            </p>
            <div className="flex gap-2">
              <Button asChild>
                <Link href="/signup">Book A Free Class</Link>
              </Button>
              <Link href="/">
                <Button variant="outline">SignUp</Button>
              </Link>
            </div>
          </div>
        </div>
        <HeroVideoPlayer src="https://res.cloudinary.com/djeoaylbe/video/upload/v1751490636/4927934_Boy_Internet_3840x2160_wiqdad.mp4" />
      </Container>
    </section>
  );
};

export default HomeHero;
