import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // import useParams for read `resId`
import VegNonVeg from "./utils/VegNonVeg";
import {
  IMG_CDN_URL,
  ITEM_IMG_CDN_URL,
  swiggy_menu_api_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
} from "../constant";

import Shimmer from "./Shimmer";
import useResMenuData from "../Custom Hooks/useResMenuData";
import { addItem,removeItem } from "./utils/cartSlice";
import { useDispatch } from "react-redux";

const RestaurantMenu = ({itemAttribute}) => {
  const { resId } = useParams(); // call useParams and get value of restaurant id using object destructuring
  const [restaurant, menuItems] = useResMenuData(
    swiggy_menu_api_URL,
    resId,
    RESTAURANT_TYPE_KEY,
    MENU_ITEM_TYPE_KEY
  );
  const vegClassifierValue = itemAttribute && itemAttribute.vegClassifier;

  const dispatch = useDispatch();

  const addFoodItem = (item) => {
   dispatch(addItem(item));
  };

  const removeFoodItem = (itemId) => {
    dispatch(removeItem(itemId)); // Dispatch the removeItem action with the itemId
  };

  const cartItems=useSelector((store) => store.cart.items);
  const itemInCart = (itemId) => {
    // Check if any item in the cart matches the current menu item's id
    return cartItems.some((item) => item.id === itemId);
  };

  return !restaurant ? (
    <Shimmer />
  ) : (
    <div className="restaurant-menu flex ">
      {/*restaurant summary details */}
      <div className="restaurant-summary">
        <img
          className="restaurant-img w-[200px] h-[150px] p-4 rounded-lg  "
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
      <div className="restaurant-menu-content" >
        <div className="menu-items-container">
          <div className="menu-title-wrap" >
            <h3 className="menu-title">Recommended</h3>
            <p className="menu-count">{menuItems.length} ITEMS</p>
          </div>
          <div className="menu-items-list divide-y-4 min-w-full divide-solid divide-orange-200" data-testid="menuItems" >
            {menuItems.map((item) => (
              <div className="menu-item" key={item?.id}>
                <div className="menu-item-details">
                <VegNonVeg itemAttribute={item?.itemAttribute} /> 

                  <h3 className="item-title">{item?.name} </h3>
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

{itemInCart(item.id) ? (
        <button
          className="p-2 m-2 bg-red-200 hover:bg-red-600 rounded-lg font-medium"
          onClick={() => removeFoodItem(item.id)}
        >
          REMOVE
        </button>
      ) : (
        <button
          data-testid="add-btn"
          className="p-2 m-2 bg-green-200 hover:bg-green-600 rounded-lg font-medium"
          onClick={() => addFoodItem(item)}
        >
          ADD
        </button>
      )}
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
