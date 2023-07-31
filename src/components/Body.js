import { restaurantList } from "./constant";
import RestaurantCard from "../RestaurantCard";
import {useState,useEffect } from "react";

// filterData function to search restaurants
const filterData = (searchText,restaurants) => {
const filterRestaurant = restaurants.filter((restaurant) => 
                          restaurant.data.name.toLowerCase().includes(searchText.trim().toLowerCase()));
                          console.log('filterRestaurant:', filterRestaurant)
  return filterRestaurant;
}

const Body = () => {
  //  let searchText="OLA" //normal js
  const [searchText, setSearchText] = useState(""); //returns =[variable name,function to update the variable]
  const [restaurants, setRestaurants] = useState(restaurantList);
  console.log(restaurants);


  useEffect( ()=> { //callback fn will be called once after the render()
       //Api call
    getRestaurants();
  console.log("call this when dependency is changed");
  },[]);

  async function getRestaurants() {
    const data = await fetch ( "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING");
    const json = await data.json();
    console.log(json);
    setRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    
  }
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
        <button className="search-button" onClick={() => 
        {
          const data = filterData(searchText, restaurants);
          setRestaurants(data);
        }
          }>Search</button>
      </div>

      <div className="restaurant-list">
        {restaurants &&  restaurants.map((restaurant) => {
          return (
            <RestaurantCard {...restaurant.data} key={restaurant.data.id} />);

        })}
      </div>
    </>
  );
};

export default Body;
 
