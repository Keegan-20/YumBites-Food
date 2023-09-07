import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // import useParams for read `resId`
import {
  swiggy_menu_api_URL,
  IMG_CDN_URL,
  ITEM_IMG_CDN_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
} from "../constant";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const { resId } = useParams(); // call useParams and get value of restaurant id using object destructuring
  const [restaurant, setRestaurant] = useState(null); // call useState to store the api data in res
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    getRestaurantInfo(); // call getRestaurantInfo function so it fetch api data and set data in restaurant state variable
  }, []);

  async function getRestaurantInfo() {
    try {
      //fetching menu details of restaurant from swiggy api
      const response = await fetch(swiggy_menu_api_URL + resId);
      const json = await response.json();
      console.log(response);

      // Set restaurant data
      const restaurantData = json?.data?.cards?.map(x => x.card)?. //maps each element in the cards array to x.card
        find(x => x && x.card['@type'] === RESTAURANT_TYPE_KEY)?. //x is not falsyand if x.card['@type'] is equal to RESTAURANT_TYPE_KEY.
        card?.info || null;  // if card found accesses its card property and then the info property.
      setRestaurant(restaurantData); //sets the state variable restaurant with the extracted restaurant data

      // Set menu item data
      const menuItemsData = json?.data?.cards.find(x => x.groupedCard)?.
        groupedCard?.cardGroupMap?.REGULAR?.
        cards?.map(x => x.card?.card)?.
        filter(x => x['@type'] == MENU_ITEM_TYPE_KEY)?.
        map(x => x.itemCards).
        flat(). //x.itemCards is an array of arrays, merges all the arrays into a single array.
        map(x => x.card?.info) || [];

 //menuItemsData contains only unique items based on their id
      const uniqueMenuItems = [];
      menuItemsData.forEach((item) => {
        //checks if there is no match in uniqueMenuItems for an item with the same id
        if (!uniqueMenuItems.find(x => x.id === item.id)) {
          //If there is no match (meaning it's a unique item), it pushes the item to the uniqueMenuItems array:
          uniqueMenuItems.push(item);
        }
      })
      setMenuItems(uniqueMenuItems);
    }
    //incase of error during fetching  of data
    catch (error) {
      setMenuItems([]);
      setRestaurant(null);
      console.log(error);
    }
  }

  return !restaurant ? (
    <Shimmer />
  ) : (
    <div className="restaurant-menu">
    {/*restaurant summary details */}
        <div className="restaurant-summary">
        <img
          className="restaurant-img"
          src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
          alt={restaurant?.name}
        />
        <div className="restaurant-summary-details">
          <h2 className="restaurant-title">{restaurant?.name}</h2>
          <p className="restaurant-tags">{restaurant?.cuisines?.join(", ")}</p>
          <div className="restaurant-details">
            <div className="restaurant-rating">
              <i className="fa-solid fa-star"></i>
              <span>{restaurant?.avgRating}</span>
            </div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurant?.sla?.slaString}</div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurant?.costForTwoMessage}</div>
          </div>
        </div>
      </div>
       {/* Restaurant menu details */}
      <div className="restaurant-menu-content">
        <div className="menu-items-container">
          <div className="menu-title-wrap">
            <h3 className="menu-title">Recommended</h3>
            <p className="menu-count">
              {menuItems.length} ITEMS
            </p>
          </div>
          <div className="menu-items-list">
            {menuItems.map((item) => (
              <div className="menu-item" key={item?.id}>
                <div className="menu-item-details">
                  <h3 className="item-title">{item?.name}</h3>
                  <p className="item-cost">

                    {item?.price > 0
                      ? new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(item?.price / 100)
                      : " "}
                  </p>
                  <p className="item-desc">{item?.description}</p>
                </div>
                      {/* menu-item image */}
                <div className="menu-img-wrapper">
                  {item?.imageId && (
                    <img
                      className="menu-item-img"
                      src={ITEM_IMG_CDN_URL + item?.imageId}
                      alt={item?.name}
                    />
                  )}
                  <button className="add-btn"> ADD +</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;