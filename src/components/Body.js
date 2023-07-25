 import { restaurantList } from "./constant";
import RestaurantCard from "../RestaurantCard";
import { useState } from "react";

const filterData = (searchText,restaurants) => {
const filterRestaurant = restaurants.filter((restaurant) => 
                          restaurant.data.name.includes(searchText));
  return filterRestaurant;
}

const Body = () => {
  //  let searchText="OLA" //normal js
  const [searchText, setSearchText] = useState(" "); //returns =[variable name,function to update the variable]
  const [restaurants, setRestaurants] = useState(restaurantList);
  return (
    <>
      <div className="search-container">
        <input type="text" placeholder="Search for restaurants and food" className="search-input" value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
               <h3>{searchText}</h3>
        <button className="search-button" onClick={() => 
        {
          const data = filterData(searchText, restaurants);
          setRestaurants(data);
        }
          }>Search</button>
      </div>

      <div className="restaurant-list">
        {restaurants.map((restaurant) => {
          return (
            <RestaurantCard {...restaurant.data} key={restaurant.data.id} />);

        })}
      </div>
    </>
  );
};

export default Body;

