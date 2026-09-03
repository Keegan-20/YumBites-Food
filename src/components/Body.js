import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import SearchBar from "./SearchBar";
import noRestaurant from "../img/noRes.png";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import {
  filterData,
  ratingFilter,
  filterFastDelivery,
  filterLowPrice,
  filterMidPrice,
  filterPureVeg,
} from "./utils/FilterRestaurants";
import Carousel from "./Carousel";
import "../../style.css";
import useOnline from "../Custom Hooks/useOnline";
import { swiggy_restaurant_details } from "../constant";

// Presentational pill button for the filter row — logic stays in Body
const FilterChip = ({ label, isActive, onClick }) => (
  <button
    aria-pressed={isActive}
    className={`shrink-0 h-9 px-4 md:px-3 inline-flex items-center gap-2 rounded-full border text-sm md:text-xs font-medium cursor-pointer transition-colors duration-200
      ${
        isActive
          ? "bg-brand-600 border-brand-600 text-white"
          : "bg-white border-cream-300 text-ink-700 hover:border-brand-300 hover:text-brand-700"
      }`}
    onClick={onClick}
  >
    {label}
    {isActive && (
      <span aria-hidden="true" className="text-xs font-bold leading-none">
        ✕
      </span>
    )}
  </button>
);

const Body = () => {
  //  function to handle search
  const handleSearch = (searchText) => {
    const data = filterData(searchText, allRestaurants);
    setFilteredRestaurants(data);
  };

  const [carouselCards, setCarouselCards] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState([]);

  //filtering the restaurant
  const [isRatingFiltered, setIsRatingFiltered] = useState(false);
  const [isFastDeliveryFiltered, setIsFastDeliveryFiltered] = useState(false);
  const [isLowPriceFiltered, setIsLowPriceFiltered] = useState(false);
  const [isMidPriceFiltered, setIsMidPriceFiltered] = useState(false);
  const [isPureVegFiltered, setIsPureVegFiltered] = useState(false);

  useEffect(() => {
    //callback fn will be called once after the render()
    //Api call
    getRestaurants(); //sideffect:api calling
  }, []);
  async function getRestaurants() {
    try {
      const data = await fetch(swiggy_restaurant_details);
      const json = await data.json();

      // initialize checkJsonData() function to check Swiggy Restaurant data
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          // initialize checkData for Swiggy Restaurant data i=5
          let checkData =
            json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;
          // if checkData is not undefined then return it
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }

      // call the checkJsonData() function which return Swiggy Restaurant data
      const resData = await checkJsonData(json);
      setAllRestaurants(resData); //initially show all restaurant on load
      setFilteredRestaurants(resData); //show only filtered restaurant search by the user
      setLoading(false);
      setCarouselCards(
        json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info
      );
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  }

  //Checking if user is online or offline
  const isOnline = useOnline();

  if (!isOnline) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 px-6 text-center">
        <span className="text-5xl" aria-hidden="true">📡</span>
        <h1 className="text-2xl md:text-xl font-bold text-ink-900">
          You're offline
        </h1>
        <p className="text-ink-500">
          Please check your internet connection and try again.
        </p>
      </div>
    );
  }
  // if not rendered properly this is called: Early return
  if (!allRestaurants) return null;

  //Conditional Rendering
  //if restaurant is empty => shimmer UI
  // else restaurant has data => actual

  if (loading) return <Shimmer cards={20} />;
  return (
    <>
      {/* Hero */}
      <section className="w-full bg-cream-100 border-b border-cream-300">
        <div className="max-w-7xl mx-auto px-6 md:px-4 pt-16 md:pt-10 pb-12 md:pb-9 flex flex-col items-center text-center gap-5">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-cream-300 text-ink-700 text-xs font-medium tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true"></span>
            Delivery in under 30 minutes
          </span>
          <h1 className="font-display text-[3.25rem] md:text-4xl semism:text-3xl font-semibold tracking-tight text-ink-900 leading-[1.05] max-w-3xl">
            Good food, from the places Goa actually eats at.
          </h1>
          <p className="text-base text-ink-500 max-w-lg leading-relaxed">
            {filteredRestaurants?.length || 0} restaurants across Central Goa,
            delivered fresh to your door.
          </p>
        </div>
      </section>

      {/* Category carousel */}
      <Carousel carouselCards={carouselCards} /> {/*item carouselCards */}

      {/* Filtering the Restaurants */}
      <section className="max-w-7xl mx-auto px-6 md:px-4">
        <div className="reslist-header mt-10 md:mt-6 mb-5 flex items-end justify-between gap-6 md:flex-col md:items-stretch md:gap-3">
          <div>
            <h2 className="font-display text-2xl md:text-xl font-semibold tracking-tight text-ink-900">
              Restaurants with online food delivery in Central Goa
            </h2>
            <p className="text-sm text-ink-500 mt-1">
              {filteredRestaurants?.length || 0} places to explore
            </p>
          </div>
          <div className="w-full max-w-sm md:max-w-full shrink-0">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        {/* filter chips row */}
        <div className="w-full overflow-x-auto no-scrollbar whitespace-nowrap pb-2">
          <div className="filter-buttons flex items-center gap-3">
            <FilterChip
              label="Ratings 4.3+"
              isActive={isRatingFiltered}
              onClick={() => {
                if (isRatingFiltered) {
                  // If the filter is already applied, clear it by setting the original list of restaurants
                  setFilteredRestaurants(allRestaurants);
                  setIsRatingFiltered(false);
                } else {
                  ratingFilter(filteredRestaurants, setFilteredRestaurants);
                  setIsRatingFiltered(true);
                }
              }}
            />

            <FilterChip
              label="Fast Delivery"
              isActive={isFastDeliveryFiltered}
              onClick={() => {
                if (isFastDeliveryFiltered) {
                  // If the filter is already applied, clear it by setting the original list of restaurants
                  setFilteredRestaurants(allRestaurants);
                  setIsFastDeliveryFiltered(false);
                } else {
                  filterFastDelivery(filteredRestaurants, setFilteredRestaurants);
                  setIsFastDeliveryFiltered(true);
                }
              }}
            />

            <FilterChip
              label="Pure Veg"
              isActive={isPureVegFiltered}
              onClick={() => {
                if (isPureVegFiltered) {
                  // If the filter is already applied, clear it by setting the original list of restaurants
                  setFilteredRestaurants(allRestaurants);
                  setIsPureVegFiltered(false);
                } else {
                  filterPureVeg(filteredRestaurants, setFilteredRestaurants);
                  setIsPureVegFiltered(true);
                }
              }}
            />

            <FilterChip
              label="Less than Rs.300"
              isActive={isLowPriceFiltered}
              onClick={() => {
                if (isLowPriceFiltered) {
                  // If the filter is already applied, clear it by setting the original list of restaurants
                  setFilteredRestaurants(allRestaurants);
                  setIsLowPriceFiltered(false);
                } else {
                  filterLowPrice(filteredRestaurants, setFilteredRestaurants);
                  setIsLowPriceFiltered(true);
                }
              }}
            />

            <FilterChip
              label="Rs.300 - Rs.600"
              isActive={isMidPriceFiltered}
              onClick={() => {
                if (isMidPriceFiltered) {
                  // If the filter is already applied, clear it by setting the original list of restaurants
                  setFilteredRestaurants(allRestaurants);
                  setIsMidPriceFiltered(false);
                } else {
                  filterMidPrice(filteredRestaurants, setFilteredRestaurants);
                  setIsMidPriceFiltered(true);
                }
              }}
            />
          </div>
        </div>
      </section>

      {filteredRestaurants.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-4 py-16 px-6 text-center">
          <img
            className="max-h-72 md:max-h-52"
            src={noRestaurant}
            alt="No Restaurant Found"
          />
          <h3 className="text-xl font-bold text-ink-900">
            No restaurants match your search
          </h3>
          <p className="text-ink-500 text-sm">
            Try a different dish or clear the filters above.
          </p>
        </div>
      ) : (
        <div
          className="max-w-7xl mx-auto px-3 flex flex-wrap justify-center mt-5"
          data-testid="res-list"
        >
          {/* Render restaurants here */}
          {filteredRestaurants.map((eachRestaurant) => (
            <Link
              className="restaurantMenu-links focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-100 rounded-2xl"
              to={"/restaurant/" + eachRestaurant?.info?.id}
              key={eachRestaurant?.info?.id}
            >
              <RestaurantCard {...eachRestaurant?.info} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Body;
