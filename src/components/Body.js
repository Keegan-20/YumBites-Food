import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import SearchBar from "./SearchBar";
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
import '../../style.css'; 
import useOnline from "../Custom Hooks/useOnline";
import { swiggy_restaurant_details } from "../constant";

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
          console.log(checkData);
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
      <h1>🔴Oops!! Seems like your offline, Please Check Your Internet🔴</h1>
    );
  }
  // if not rendered properly this is called: Early return
  if (!allRestaurants) return null;
  // use searchData function and set condition if data is empty show error message
  // if(filteredRestaurants?.length === 0) return <h1>Sorry! No Restaurant Found</h1>

  //Conditional Rendering
  //if restaurant is empty => shimmer UI
  // else restaurant has data => actual

  if (loading) return <Shimmer cards={20} />;
  return (
    <>
      <Carousel carouselCards={carouselCards} /> {/*item carouselCards */}
      <div className="divider">
        <hr className=" border-[1px] bg-[rgb(240, 240, 245)] m-5 sm:m-2"></hr>
      </div>

      {/* Filtering the Restaurants */}
      <div className="reslist-header mb-5">
        <h2 className="font-bold text-3xl mt-5 p-4 ml-5 md:text-lg">
          Restaurants with online food delivery in Central Goa
        </h2>
      </div>
      {/* filtering restaurants based on ratings */}
      <div className=" w-full md:filter-buttons-container  overflow-x-auto whitespace-nowrap ">

      <div className="filter-buttons   flex items-center ml-[2rem]">
        <div className="rating-button mr-4">
          <button
            className={`p-2   border border-black rounded-3xl border-opacity-30 cursor-pointer md:text-sm md:p-3
                    ${isRatingFiltered ? "bg-[#A84908] text-white" : ""}`}
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
          >
            Ratings 4.3+
            {isRatingFiltered && (
              <span className=" ml-3 p-2 pl-0 size-9 text-xl font-medium">
                x
              </span>
            )}
          </button>
        </div>

        <div className="fastdelivery-button mr-4">
          <button
            className={`p-2  border border-black rounded-3xl border-opacity-30 cursor-pointer md:text-sm md:p-3
                    ${isFastDeliveryFiltered ? "bg-[#A84908] text-white" : ""}`}
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
          >
            Fast Delivery
            {isFastDeliveryFiltered && (
              <span className=" ml-3 p-2 pl-0 size-9 text-xl font-medium">
                x
              </span>
            )}
          </button>
        </div>

        <div className="pureVeg-button mr-4">
          <button
            className={`p-2 border  border-black rounded-3xl border-opacity-30 cursor-pointer md:text-sm md:p-3 
                    ${isPureVegFiltered ? "bg-[#A84908] text-white" : ""}`}
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
          >
            Pure Veg
            {isPureVegFiltered && (
              <span className=" ml-3 p-2 pl-0 size-9 text-xl font-medium">
                x
              </span>
            )}
          </button>
        </div>

        <div className="lowPrice-button mr-4">
          <button
            className={`p-2  border  border-black rounded-3xl border-opacity-30 cursor-pointer md:text-sm md:p-3 
                    ${isLowPriceFiltered ? "bg-[#A84908] text-white" : ""}`}
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
          >
            Less than Rs.300
            {isLowPriceFiltered && (
              <span className=" ml-3 p-2 pl-0 size-9 text-xl font-medium">
                x
              </span>
            )}
          </button>
        </div>
        <div className="midPrice-button mr-4">
          <button
            className={`p-2  border border-black rounded-3xl border-opacity-30 cursor-pointer md:text-sm md:p-3
                    ${isMidPriceFiltered ? "bg-[#A84908] text-white" : ""}`}
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
          >
            Rs.300 - Rs.600
            {isMidPriceFiltered && (
              <span className=" ml-3 p-2 pl-0 size-9 text-xl font-medium">
                x
              </span>
            )}
          </button>
        </div>

        {/* Search bar functionality */}
        <div className="desktop-search"  >
        <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      </div>

    <div className="responsive-search" >
    <SearchBar onSearch={handleSearch} />
    </div>
      {
        <div
          className="flex flex-wrap justify-center align-middle "
          data-testid="res-list"
        >
          {filteredRestaurants.map((eachRestaurant) => {
            return (
              <Link
                className="restaurantMenu-links"
                to={"/restaurant/" + eachRestaurant?.info?.id}
                key={eachRestaurant?.info?.id}
              >
                <RestaurantCard {...eachRestaurant?.info} />
              </Link>
            );
            // <RestaurantCard {...restaurant.data} key={restaurant.data.id} />);
          })}
        </div>
      }
    </>
  );
};

export default Body;
