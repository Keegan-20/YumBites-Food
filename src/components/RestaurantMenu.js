import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // import useParams for read `resId`
import VegNonVeg from "./utils/VegNonVeg";
import {
  ITEM_IMG_CDN_URL,
  swiggy_menu_api_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
} from "../constant";
import ResMenuHeader from "./ResMenuHeader";
import Shimmer from "./Shimmer";
import useResMenuData from "../Custom Hooks/useResMenuData";
import { addItem, removeItem } from "./utils/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";


const RestaurantMenu = ({ itemAttribute }) => {
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

  const cartItems = useSelector((store) => store.cart.items);
  const itemInCart = (itemId) => {
    // Check if any item in the cart matches the current menu item's id
    return cartItems.some((item) => item.id === itemId);
  };

  return !restaurant ? (
    <Shimmer />
  ) : (
    <div className="restaurant-menu max-w-4xl mx-auto px-6 md:px-4 animate-fade-in">
      {/* restaurant summary details  */}
      <div className="w-full mt-6 md:mt-4">
        <ResMenuHeader restaurant={restaurant} />
      </div>

      {/* Restaurant menu details */}
      <div className="restaurant-menu-content mb-28">
        <div className="menu-items-container mt-8 w-full">
          <div className="menu-title-wrap py-4 flex items-baseline justify-between">
            <h3 className="menu-title text-xl font-bold tracking-tight text-ink-900">
              All Items
            </h3>
            <p className="menu-count text-xs font-bold text-ink-300 tracking-widest">
              {menuItems.length} ITEMS
            </p>
          </div>
          <div
            className="menu-items-list flex flex-col divide-y divide-ink-100"
            data-testid="menuItems"
          >
            {menuItems.map((item) => (
              <div
                className="menu-item flex justify-between gap-6 md:gap-4 py-6"
                key={item?.id}
              >
                <div className="menu-item-details flex flex-col min-w-0 self-start flex-1">
                  <VegNonVeg itemAttribute={item?.itemAttribute} />

                  <h3 className="item-title text-ink-900 font-bold pt-2 text-lg md:text-base leading-snug">
                    {item?.name}{" "}
                  </h3>
                  <p className="item-cost mt-1 text-ink-700 font-semibold text-sm">
                    {item?.price > 0
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item?.price / 100)
                      : " "}
                  </p>
                  {item?.description && (
                    <p className="item-desc mt-2 leading-6 text-ink-500 text-sm line-clamp-3">
                      {item?.description}
                    </p>
                  )}
                </div>

                {/* menu-item image */}
                <div className="menu-img-wrapper relative shrink-0 w-32 md:w-28 flex flex-col items-center">
                  {item?.imageId ? (
                    <img
                      className="menu-item-img h-28 w-32 md:h-24 md:w-28 object-cover rounded-xl shadow-card"
                      src={ITEM_IMG_CDN_URL + item?.imageId}
                      alt={item?.name}
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-28 w-32 md:h-24 md:w-28 rounded-xl bg-ink-50" aria-hidden="true"></div>
                  )}

                  {itemInCart(item.id) ? (
                    <button
                      className="-mt-4 px-5 py-2 bg-white text-red-600 hover:bg-red-50 rounded-lg border border-ink-100 shadow-card-hover font-bold text-sm md:text-xs cursor-pointer active:scale-95 transition-all duration-200 tracking-wide"
                      onClick={() => {
                        removeFoodItem(item.id)
                        toast.error("Item removed from cart");
                      }}
                    >
                      REMOVE
                    </button>
                  ) : (
                    <button
                      data-testid="add-btn"
                      className="-mt-4 px-6 py-2 bg-white text-brand-700 hover:bg-brand-50 rounded-lg border border-brand-200 shadow-card-hover font-bold text-sm md:text-xs cursor-pointer active:scale-95 transition-all duration-200 tracking-wide"
                      onClick={() => {
                        addFoodItem(item)
                        toast.success("Item added to cart");
                      }}
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
