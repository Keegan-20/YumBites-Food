import React, { useState, useEffect, useRef } from "react";
import { ITEM_IMG_CDN_URL } from "../constant";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CarouselBtn from "./CarouselBtn";

const Carousel = ({ carouselCards }) => {
  // Check if carouselCards is falsy or not an array
  if (!carouselCards || !Array.isArray(carouselCards)) return null;
  if (!carouselCards) return null;
  const carousel = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const moveNext = () => {
    setMaxIndex(
      Math.floor(carousel.current.scrollWidth / carousel.current.offsetWidth) -
        1
    );
    if (currentIndex <= maxIndex) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    if (carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-4 mt-10 md:mt-6">
      <div className="rounded-3xl bg-cream-100 border border-cream-300 px-7 py-7 md:px-4 md:py-5">
        <div className="flex items-center justify-between w-full mb-4">
          <h3 className="font-display text-2xl md:text-xl font-semibold tracking-tight text-ink-900">
            What's on your mind?
          </h3>
          <div className="flex gap-3">
            <CarouselBtn
              onClick={movePrev}
              disabled={currentIndex === 0}
              icon={faArrowLeft}
            />
            <CarouselBtn
              onClick={moveNext}
              disabled={currentIndex > maxIndex}
              icon={faArrowRight}
            />
          </div>
        </div>
        <div className="w-full relative overflow-hidden">
          <div
            ref={carousel}
            className="flex gap-6 md:gap-3 overflow-hidden scroll-smooth no-scrollbar py-2"
          >
            {carouselCards.map((carouselCard) => (
              <img
                key={carouselCard.id}
                className="shrink-0 w-36 h-36 md:w-24 md:h-24 object-contain mix-blend-multiply cursor-pointer rounded-full transition-transform duration-200 ease-out hover:scale-110"
                src={ITEM_IMG_CDN_URL + carouselCard.imageId}
                alt="Food category"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
