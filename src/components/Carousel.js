import React, { useState, useEffect, useRef } from "react";
import { ITEM_IMG_CDN_URL } from "../constant";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CarouselBtn from "./CarouselBtn";

const Carousel = ({ carouselCards }) => {
    // console.log("carouselCards:", carouselCards);

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
    <div className="w-11/12 h-64 flex flex-col mt-10  ">
      <div className="flex items-center justify-between w-full">
        <h3 className="font-bold text-xl pl-4 p-5">What's on your mind?</h3>
        <div className="flex gap-4">
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
      <div className="w-full  h-52 md:h-44 relative overflow-hidden ">
        <div
          ref={carousel}
          className="h-full pl-5 flex gap-8 overflow-hidden scroll-smooth"
        >
          {carouselCards.map((carouselCard) => (
            <img
              key={carouselCard.id}
              className="object-center h-full w-52 md:w-20 md:h-[60%] transition-transform hover:scale-110 duration-200 mix-blend-multiply cursor-pointer"
              src={ITEM_IMG_CDN_URL + carouselCard.imageId}
              alt="card img"
            />
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default Carousel;