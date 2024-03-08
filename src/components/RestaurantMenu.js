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
import ResMenuHeader from "./ResMenuHeader";
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
    <div className="restaurant-menu ">
      {/*restaurant summary details */}
      <div className="flex justify-center w-[80%] mt-3 pl-4">
      <ResMenuHeader restaurant={restaurant} />
      </div>

      {/* Restaurant menu details */}
      <div className="restaurant-menu-content flex justify-center" >
        <div className="menu-items-container mt-8 w-[80%]">
          <div className="menu-title-wrap p-5" >
            <h3 className="menu-title text-xl font-bold">All Items</h3>
            <p className="menu-count font-semibold text-gray-400 ">{menuItems.length} ITEMS</p>
          </div>
          <div className="menu-items-list flex flex-col justify-center divide-y-4  divide-solid divide-orange-200" data-testid="menuItems" >
            {menuItems.map((item) => (
              <div className="menu-item flex justify-between p-5" key={item?.id}>
                <div className="menu-item-details flex  flex-col overflow-hidden h-auto self-start">
                <VegNonVeg itemAttribute={item?.itemAttribute} /> 

                  <h3 className="item-title w-auto text-[#333] font-bold pt-2 text-lg">{item?.name} </h3>
                  <p className="item-cost mt-1">
                    {item?.price > 0
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item?.price / 100)
                      : " "}
                  </p>
                  <p className="item-desc mt-3 leading-6 text-gray-500 text-sm ">{item?.description}</p>
                </div>

                {/* menu-item image */}
                <div className="menu-img-wrapper flex flex-col justify-center  items-end w-1/3 overflow-hidden h-auto">
                  {item?.imageId && (
                    <img
                      className="menu-item-img h-24 w-24 border rounded-md"
                      src={ITEM_IMG_CDN_URL + item?.imageId}
                      alt={item?.name}
                    />
                  )} 

{itemInCart(item.id) ? (
        <button
          className="p-2 m-2 bg-red-200 hover:bg-red-600 rounded-lg border-none font-semibold text-sm cursor-pointer"
          onClick={() => removeFoodItem(item.id)}
        >
          REMOVE -
        </button>
      ) : (
        <button
          data-testid="add-btn"
          className="p-2 m-2 bg-green-200 hover:bg-green-600 rounded-lg border-none font-semibold  text-sm cursor-pointer"
          onClick={() => addFoodItem(item)}
        >
          ADD +
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
