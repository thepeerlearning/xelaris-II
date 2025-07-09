"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const ParentReviewsData = [
  {
    name: "Kateryna",
    country: "Canada",
    testimony:
      "I am thrilled to share my experience with my son's experience at Xelaris! As a parent, I find the organization to be impeccable, making everything easy and straightforward. My 11-year-old is absolutely engaged and progressing remarkably with his coding skills. What I appreciate most is how the projects are designed to be relatable to real-life situations. For instance, simulating a banking machine not only teaches coding but also introduces important finance concepts in a fun and interactive way. This creative approach to learning really sets this program apart.",
    imageUrl: "/assets/images/testimonials/kateryna.png",
  },
  {
    name: "Alice",
    country: "Indonesia",
    testimony:
      "My son loves his coding classes at Xelaris. Sam is an excellent coding teacher that always pushes him to learn more and reach his full potential! Sam has a very wide range of experience with many coding languages and excels in teaching all of them.",
    imageUrl: "/assets/images/testimonials/alice.png",
  },
  {
    name: "Mohammed",
    country: "Dubai",
    testimony:
      "The one-on-one classes at Xelaris have been amazing for us! My daughter usually struggles with online learning because it feels so impersonal, but this is completely different. She actually gets excited for her sessions now! Her teacher Amelia is incredible she's so patient and really knows how to keep kids engaged. What I really love as a parent is getting those detailed session notes after each class. I can see exactly what she learned and worked on. Plus, the flexible scheduling has been a lifesaver. We can easily reschedule when things come up.",
    imageUrl: "/assets/images/testimonials/mohammed.png",
  },
  {
    name: "Hameed",
    country: "United States",
    testimony:
      "As a software engineer, I can confidently say that Xelaris is an exceptional company for teaching children programming in a fun and engaging way. They teach real technologies that are used in the workplace. My daughter, Ava, is taking web development classes. She started with HTML, progressed to CSS, and has created projects she's genuinely proud of. She loves her instructor and always looks forward to her class. I would highly recommend Xelaris to any parent looking to introduce their child to tech.",
    imageUrl: "/assets/images/testimonials/hammeed.png",
  },
];

const Testimonial = () => {
  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 48,
    },
  };

  return (
    <Container className="w-full">
      <div className="flex justify-end mb-10">
        <svg
          width="195"
          height="14"
          viewBox="0 0 195 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.0300296 7.12726L0.0300293 0.5L194.97 0.499991L194.97 7.12725L0.0300296 7.12726Z"
            fill="#FEFC00"
          />
          <path
            d="M0.0300296 7.12726L0.0300293 0.5L61.1553 0.499997L61.1553 7.12726L0.0300296 7.12726Z"
            fill="#1F808D"
          />
          <path
            d="M59.97 6.98L59.97 0.5L69.69 0.5L69.69 6.98L59.97 6.98Z"
            fill="#EB001B"
          />
          <path
            d="M141.692 13.9997L141.692 7.12695L194.97 7.12695L194.97 13.9997L141.692 13.9997Z"
            fill="#C0F864"
          />
          <path
            d="M141.51 14.0005V6.98047H118.83V14.0005H141.51Z"
            fill="#FBBC04"
          />
        </svg>
      </div>
      <h2 className="text-4xl font-medium mb-10">
        Parents <span className="font-spectral">Reviews</span>
      </h2>
      <Swiper
        modules={[Navigation, Pagination]}
        breakpoints={breakpoints}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          el: ".swiper-pagination-custom",
          clickable: true,
        }}
        loop
        className="parent-reviews-swiper"
      >
        {ParentReviewsData.map((item, index) => (
          <SwiperSlide key={`${item.name}-${index}`}>
            <div className="w-full md:max-w-[276px] mx-auto">
              <div className="space-y-5">
                <Image
                  src={item.imageUrl}
                  height={276}
                  width={276}
                  alt={`Parent review by ${item.name}`}
                  className="w-full h-[276px] object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-[#F2F0EB] md:text-xl">
                    {item.name}
                  </h3>
                  <p className="text-sm text-light-yellow-70 mt-1">
                    {item.country}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-light-yellow-70">
                  {item.testimony}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex items-center justify-between py-10">
        <div className="swiper-pagination-custom flex gap-0.5 w-fit max-w-[100px]"></div>
        <div className="flex gap-4">
          <Button
            type="button"
            className="rounded-full h-12 w-12 swiper-button-prev-custom hover:opacity-50"
            variant="outline"
            aria-label="Previous slide"
          >
            <ChevronLeft />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="rounded-full h-12 w-12 swiper-button-next-custom hover:opacity-50"
            aria-label="Next slide"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Testimonial;
