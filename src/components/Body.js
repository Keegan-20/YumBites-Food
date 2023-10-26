import RestaurantCard from "../RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import 'react-loading-skeleton/dist/skeleton.css'
import RestaurantMenu from "./RestaurantMenu";
import { Link } from "react-router-dom";
import { filterData } from "./utils/helper";
import useOnline from "../Custom Hooks/useOnline";

const Body = () => {
  //let searchText="OLA" //normal js
  const [searchText, setSearchText] = useState(""); //returns =[variable name,function to update the variable]
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true); 
  const[errorMessage,setErrorMessage] = useState([]);

  useEffect(() => { //callback fn will be called once after the render()
    //Api call
    getRestaurants(); //sideffect:api calling
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
    // console.log(setAllRestaurants);
    setFilteredRestaurants(resData); //show only filtered restaurant search by the user 
    setLoading(false);
  }
  console.log("render");

  //Checking if user is online or offline
  const isOnline=useOnline();
  
  if(!isOnline){
    return <h1>🔴Oops!! Seems like your offline, Please Check Your Internet🔴</h1>
  }
// if not rendered properly this is called: Early return
if(!allRestaurants) return null;
// use searchData function and set condition if data is empty show error message
// if(filteredRestaurants?.length === 0) return <h1>Sorry! No Restaurant Found</h1>

//Conditional Rendering
//if restaurant is empty => shimmer UI
// else restaurant has data => actual

if (loading) return <Shimmer cards={20}/>;   ;
return(
    <>
      <div className="search-container my-2 p-2 flex ">
        {/* <marquee> <h1>Stay Disciplined And Stay Focused !! </h1> </marquee> */}

        <input type="text"
          placeholder="Search for restaurants"
      className="search-input p-2 border-solid border-2 border-black-500 rounded-lg 
       focus:bg-[#FFFBAC]"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <h3>{searchText}</h3>
        {/* Searching the restaurant */}
        <button className="search-button bg-amber-200   py-1 px-2  my-2 rounded-lg text-black ml-2" onClick={() => {
          const data = filterData(searchText,allRestaurants);
          setFilteredRestaurants(data);
        }
        }>Search</button>
      </div>

{

 <div className="flex flex-wrap">
 {filteredRestaurants.map((eachRestaurant) => {
   return (
    <Link className="restaurantMenu-links"
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

