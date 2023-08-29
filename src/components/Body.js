import { restaurantList } from "./constant";
import RestaurantCard from "../RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// filterData function to search restaurants
const filterData = (searchText, restaurants) => {
  const filterData = restaurants.filter((restaurant) =>
  restaurant?.data?.name?.toLowerCase()?.includes(searchText.trim().toLowerCase()));
  console.log('filterRestaurant:', filterData)
  return filterData;
}

const Body = () => {
  //  let searchText="OLA" //normal js
  const [searchText, setSearchText] = useState(""); //returns =[variable name,function to update the variable]
  const[isLoading,setIsLoading] = useState([true]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  // console.log(restaurants);


  useEffect(() => { //callback fn will be called once after the render()
    //Api call
    getRestaurants(); //sideffect:api calling
    console.log("call this when dependency is changed");
  }, []);

  async function getRestaurants() {
    const data = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=15.4934622&lng=73.8327136&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    // initialize checkJsonData() function to check Swiggy Restaurant data
    async function checkJsonData(jsonData) {
      for (let i = 0; i < jsonData?.data?.cards.length; i++) {

        // initialize checkData for Swiggy Restaurant data i=5
        let checkData = json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
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
    console.log(setAllRestaurants);
    setFilteredRestaurants(resData); //show only filtered restaurant search by the 
    console.log(setFilteredRestaurants);
   
 
  }
  console.log("render");

// if not rendered properly this is called Early return
if(!allRestaurants) return null;
// if(filteredRestaurants?.length === 0) return <h1>Sorry! No Restaurant Found</h1>
//Conditional Rendering
//if restaurant is empty => shimmer UI
// else restaurant has data => actual data UI 
//used ternary operator
  return allRestaurants.length === 0 ? (
    <Skeleton count={5} />
  ) : (
    <>
      <div className="search-container">
        <marquee> <h1>Stay Disciplined And Stay Focused !! </h1> </marquee>

        <input type="text"
          placeholder="Search for restaurants and food"
          className="search-input"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <h3>{searchText}</h3>
        {/* Searching the restaurant */}
        <button className="search-button" onClick={() => {
          const data = filterData(searchText,allRestaurants);
          setFilteredRestaurants(data);
        }
        }>Search</button>
      </div>

      <div className="card">
    <Skeleton  width={230} height={180} 
     style={{ borderRadius:8 }} /> 
    <h2><Skeleton/></h2>
    <p><Skeleton/></p>
    <p><Skeleton/></p>
     <h3><Skeleton/></h3>
</div>
      <div className="restaurant-list">
        {filteredRestaurants.map((eachRestaurant) => {
          return (
            <RestaurantCard key={eachRestaurant?.info?.id} {...eachRestaurant?.info} />);
          // <RestaurantCard {...restaurant.data} key={restaurant.data.id} />);
        })}
      </div>
    </>
  );
};

export default Body;

