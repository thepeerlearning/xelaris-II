"use client"

import { motion } from "framer-motion"
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import Container from "@/components/container"
import { Button } from "@/components/ui/button"
import Image from "next/image"

import { schoolData } from "@/data"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/navigation"
import "swiper/css/pagination"
import BookClassButton from "../../_components/bookClass"

const WhatWeTeach = () => {
  return (
    <section className="relative overflow-hidden py-16">
      <Container>
        <div className="text-center mb-12">
          <h1 className="font-medium text-5xl text-[#FFFEFA] mb-4">
            What we <br className="lg:hidden" />{" "}
            <span className="font-spectral">teach</span>
          </h1>
          <p className="text-[#FFFEFA]/60 mx-auto">
            We teach Software Engineering, AI, Blockchain through a curriculum{" "}
            <br className="hidden lg:block" />
            that helps kids become confident problem-solvers and future-ready
            builders.
          </p>
        </div>

        <motion.div className="w-full relative z-10">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={25}
            slidesPerView="auto"
            centeredSlides={false}
            breakpoints={{
              640: { slidesPerView: 1.2, spaceBetween: 25 },
              768: { slidesPerView: 2, spaceBetween: 25 },
              1024: { slidesPerView: 2.5, spaceBetween: 25 },
              1280: { slidesPerView: 3, spaceBetween: 25 },
            }}
          >
            {schoolData.map((course) => (
              <SwiperSlide
                key={course.title}
                className="!w-[321px] md:!w-[425px] "
              >
                <div className="w-full h-[375px] bg-[#42464B] flex flex-col border border-white rounded overflow-hidden">
                  {/* Image + Overlay */}
                  <div className="h-full w-full relative">
                    <Image
                      alt={course.title}
                      src={course.imageUrl}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b via-black/60 from-transparent to-black z-10" />
                    <div className="absolute bottom-0 z-20 p-4 flex justify-between w-full text-sm text-white">
                      <p>{course.level}</p>
                      <p className="capitalize">{course.prerequisite}</p>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-4 flex flex-col gap-2 mt-auto bg-background">
                    <h2 className="text-lg font-semibold text-white">
                      {course.title}
                    </h2>
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        size="sm"
                        className="bg-transparent border border-white text-white hover:bg-transparent"
                      >
                        Online
                      </Button>
                      <Button
                        size="sm"
                        className="bg-transparent border border-white text-white hover:bg-transparent"
                      >
                        1:1 Class
                      </Button>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="p-4 border-t border-white  bg-background">
                    <BookClassButton />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </Container>
    </section>
  )
}

export default WhatWeTeach
