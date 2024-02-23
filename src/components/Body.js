import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { filterData,ratingFilter,filterFastDelivery,filterLowPrice, filterMidPrice } from "./utils/FilterRestaurants";
import Carousel from "./Carousel";
import useOnline from "../Custom Hooks/useOnline";
import { swiggy_restaurant_details } from "../constant";

const Body = () => {
  //let searchText="OLA" //normal js
  const [searchText, setSearchText] = useState(""); //returns =[variable name,function to update the variable]
  const [carouselCards, setCarouselCards] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState([]);


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

  console.log("render");

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
      <div className="search-container my-3 p-2 flex justify-center align-middle ">
        {/* <marquee> <h1>Stay Disciplined And Stay Focused !! </h1> </marquee> */}

        <input
          data-testid="search-input"
          type="text"
          placeholder="Search for restaurants"
          className="search-input p-2 border-solid  border-2 border-black-500 rounded-lg 
       focus:bg-[#FFFBAC]  w-[50%]"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <h3>{searchText}</h3>
        {/* Searching the restaurant */}
        <button
          data-testid="search-btn"
          className="search-button bg-amber-200 text-lg  p-2  my-2 rounded-lg text-black ml-2"
          onClick={() => {
            const data = filterData(searchText, allRestaurants);
            setFilteredRestaurants(data);
          }}
        >
          Search
        </button>
      </div>

         <Carousel carouselCards={carouselCards} /> {/*item carouselCards */}

      <div className="divider">
        <hr className=" border-[1px] bg-[rgb(240, 240, 245)] m-5"></hr>
      </div>
             {/* Filtering the Restaurants */}
        <div className="reslist-header mb-5">
          <h2 className="font-bold text-3xl ml-5">
            Restaurants with online food delivery in Central Goa
          </h2>
        </div>

        {/* filtering restaurants based on ratings */}
        <div className="filter-buttons flex items-center">
                <div className="rating-button mr-4">
                  <button
                    className="p-2 border border-black rounded-3xl border-opacity-30 cursor-pointer active:bg-orange-400"
                    onClick={() => ratingFilter(filteredRestaurants,setFilteredRestaurants)
                    }
                     >  
                    Ratings 4.3+
                  </button>
            </div>
        <div className="filter-buttons flex items-center">
                <div className="rating-button mr-4">
                  <button
                    className="p-2 border border-black rounded-3xl border-opacity-30 cursor-pointer active:bg-orange-400"
                    onClick={() => filterLowPrice(filteredRestaurants,setFilteredRestaurants)
                    }
                     >  
                      Less than Rs.300
                  </button>
            </div>
            </div>
        <div className="filter-buttons flex items-center">
                <div className="rating-button mr-4">
                  <button
                    className="p-2 border border-black rounded-3xl border-opacity-30 cursor-pointer active:bg-orange-400"
                    onClick={() => filterMidPrice(filteredRestaurants,setFilteredRestaurants)
                    }
                     >  
                      Rs.300 - Rs.600
                  </button>
            </div>
            </div>

            <div className="fastdelivery-button mr-4">
                  <button
                    className="p-2 border border-black rounded-3xl border-opacity-30 cursor-pointer focus:bg-orange-400"
                    onClick={() =>{
                      filterFastDelivery(filteredRestaurants,setFilteredRestaurants)
                     }
                    }
                  >
                    Fast Delivery
                  </button>
                </div>
        </div>

      {
        <div
          className="flex flex-wrap md:justify-center"
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
