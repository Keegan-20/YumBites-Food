import React, { useRef } from "react";
import { ITEM_IMG_CDN_URL } from "../constant";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CarouselBtn from "./CarouselBtn";
import { Swiper, SwiperSlide } from "swiper/swiper-react.mjs";
import { Autoplay } from "swiper/modules/index.mjs";
import "swiper/swiper.css";

const Carousel = ({ carouselCards, onCategorySelect, activeCategory }) => {
  // Check if carouselCards is falsy or not an array
  if (!carouselCards || !Array.isArray(carouselCards)) return null;

  // Swiper owns the scroll position now; we only keep a handle so the arrows
  // can still nudge the rail.
  const swiperRef = useRef(null);

  // A rail that never stops moving is the thing reduced-motion users are
  // asking to be spared, so autoplay is off entirely for them.
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <section className="w-full">
      <div className="bg-cream-100 border-y border-cream-300 py-7 md:py-5">
        <div className="max-w-7xl mx-auto px-6 md:px-4">
          <div className="flex items-center justify-between w-full mb-4">
            <h3 className="font-display text-2xl md:text-xl font-semibold tracking-tight text-ink-900">
              What's on your mind?
            </h3>
            <div className="flex gap-3">
              <CarouselBtn
                onClick={() => swiperRef.current?.slidePrev()}
                icon={faArrowLeft}
              />
              <CarouselBtn
                onClick={() => swiperRef.current?.slideNext()}
                icon={faArrowRight}
              />
            </div>
          </div>
          <div className="w-full relative overflow-hidden">
            {/* Steps one slide every 3s and rests, the way a category rail
                behaves in a shipped app — a rail that drifts non-stop is hard
                to read and hard to click. */}
            <Swiper
              /* Swiper clips at its own box, so the rail needs enough vertical
                 padding to fit the hover scale (9px) plus the selected ring and
                 its offset (4px) — otherwise both get sliced off. */
              className="!py-4"
              modules={[Autoplay]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              slidesPerView="auto"
              spaceBetween={24}
              breakpoints={{ 0: { spaceBetween: 12 }, 769: { spaceBetween: 24 } }}
              loop={true}
              speed={600}
              autoplay={
                prefersReducedMotion
                  ? false
                  : {
                      delay: 3000,
                      // Keep going after a drag or an arrow click; stopping for
                      // good on first touch is the usual autoplay annoyance.
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
              }
            >
              {carouselCards.map((carouselCard) => {
                // The category label lives on the card's action ("Idli", "Pasta")
                const label = carouselCard?.action?.text ?? "";
                const isActive = activeCategory === label;

                return (
                  <SwiperSlide key={carouselCard.id} className="!w-auto">
                
                    <button
                      type="button"
                      onClick={() => onCategorySelect?.(label)}
                      aria-pressed={isActive}
                      aria-label={
                        label ? `Show restaurants serving ${label}` : "Food category"
                      }
                      className={`bg-cream-100 rounded-full cursor-pointer transition-transform duration-200 ease-out hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-100 ${
                        isActive ? "ring-2 ring-brand-600 ring-offset-2 ring-offset-cream-100" : ""
                      }`}
                    >
                      <img
                        className="w-44 h-44 lg:w-40 lg:h-40 md:w-28 md:h-28 object-contain mix-blend-multiply rounded-full"
                        src={ITEM_IMG_CDN_URL + carouselCard.imageId}
                        alt={label || "Food category"}
                        loading="lazy"
                      />
                    </button>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
