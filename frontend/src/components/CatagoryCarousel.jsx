import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";

const catagory = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CatagoryCarousel = () => {
  return (
    <section>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {catagory.map((cat, index) => (
            <CarouselItem
              className="basis-[30%] md:basis-[40%] lg-basis-1/3"
              key={index}>
              <Button
                variant="outline"
                className="rounded-full bg-slate-100 hover:bg-slate-200">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default CatagoryCarousel;
