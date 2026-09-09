import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "#components/ui/carousel";
import { Button } from "#components/ui/button";
import { Badge } from "#components/ui/badge";
import Autoplay from "embla-carousel-autoplay";
import video_banner1 from "../../assets/video-banner/banner3.mov";
import video_banner2 from "../../assets/video-banner/banner2.mov";
import video_banner3 from "../../assets/video-banner/banner1.mp4";

const BannerCarousel = () => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <div className="absolute w-full h-full flex flex-col justify-center items-center text-white">
            <h1 className="font-black text-7xl text-shadow-[0px_0px_20px_#A78BFA]">
              PRECISION TO VICTORY.
            </h1>
            <p>
              Precision gear designed for ultimate control. Upgrade today.A78BFA
            </p>
            <Button
              variant="outline"
              className={
                "rounded-lg mt-20 px-8 py-5 shadow-lg shadow-gpurple-2 text-gpurple-2 inset-shadow-sm inset-shadow-gpurple-1"
              }
            >
              SHOP NOW {"⮞"}
            </Button>
          </div>
          <video
            className="border w-full h-175 object-cover"
            src={video_banner1}
            muted
            autoPlay
            loop
          ></video>
        </CarouselItem>
        <CarouselItem>
          <div className="absolute w-full h-full flex flex-col justify-center items-center text-white">
            <div>
              <Badge variant="outline" className={"bg-red-500/25"}>
                NEW ARRIVAL
              </Badge>
              <h2 className="font-extrabold text-6xl tracking-wide text-shadow-lg text-shadow-pink-500 my-2">
                GearVerse Magnetic Keyboard MK II
              </h2>
              <p className="uppercase font-bold text-xl">
                Light up your typing
              </p>
            </div>
          </div>
          <video
            className="border w-full h-175 object-cover"
            src={video_banner2}
            muted
            autoPlay
            loop
          ></video>
        </CarouselItem>
        <CarouselItem>
          <div className="absolute w-full h-full flex flex-col gap-3 justify-center items-center text-white">
            <p className="font-extrabold tracking-wider text-xl text-shadow-xs text-shadow-pink-600">
              SPECIAL OFFER
            </p>
            <h1 className="font-black text-6xl bg-[#c42976] p-4 rounded-2xl shadow-2xl shadow-[#bd427f]">
              BACK TO SCHOOL
            </h1>
            <h3 className="text-4xl font-semibold">
              GET{" "}
              <span className="text-5xl font-extrabold text-pink-400 underline">
                70%
              </span>{" "}
              OFF
            </h3>
            {/* <Button
                variant="outline"
                className={
                  "rounded-lg mt-20 px-8 py-5 shadow-lg shadow-gpurptext-gpurple-2 inset-shadow-sm inset-shadow-gpurptext-gpurple-2"
                }
              >
                SHOP NOW {"⮞"}
              </Button> */}
          </div>
          <video
            className="border w-full h-175 object-cover"
            src={video_banner3}
            muted
            autoPlay
            loop
          ></video>
        </CarouselItem>
      </CarouselContent>
      {/* <CarouselPrevious /> */}
      {/* <CarouselNext /> */}
    </Carousel>
  );
};

export default BannerCarousel;
