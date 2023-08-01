import { restaurantList } from "./constant";
import RestaurantCard from "../RestaurantCard";
import { useState, useEffect } from "react";

// filterData function to search restaurants
const filterData = (searchText, restaurants) => {
  const filterRestaurant = restaurants.filter((restaurant) =>
    restaurant.data.name.toLowerCase().includes(searchText.trim().toLowerCase()));
  console.log('filterRestaurant:', filterRestaurant)
  return filterRestaurant;
}

const Body = () => {
  //  let searchText="OLA" //normal js
  const [searchText, setSearchText] = useState(""); //returns =[variable name,function to update the variable]
  const [restaurants, setRestaurants] = useState([]);
  // console.log(restaurants);

  useEffect(() => { //callback fn will be called once after the render()
    //Api call
    getRestaurants();
    console.log("call this when dependency is changed");
  }, []);

  async function getRestaurants() {
    const data = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=15.4934622&lng=73.8327136&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    // initialize checkJsonData() function to check Swiggy Restaurant data
    async function checkJsonData(jsonData) {
      for (let i = 0; i < jsonData?.data?.cards.length;i++) {

        // initialize checkData for Swiy Restaurant data
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
    setRestaurants(resData);
  }
  console.log("render");
  return (
    <>
      <div className="search-container">
        {/* <marquee> <h1>Stay Disciplined And Stay Focused !! </h1> </marquee> */}

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
          const data = filterData(searchText, restaurants);
          setRestaurants(data);
        }
        }>Search</button>
      </div>

      <div className="restaurant-list">
        {restaurants.map((restaurant) => {
          return (
            <RestaurantCard key={restaurant?.info?.id} {...restaurant?.info} />);
          // <RestaurantCard {...restaurant.data} key={restaurant.data.id} />);
        })}
      </div>
    </>
  );
};

export default Body;

