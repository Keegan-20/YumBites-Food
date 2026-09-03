import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCartItemQuantity, removeItem } from "./utils/cartSlice";
import { IMG_CDN_URL } from "../constant";
import { AiFillDelete } from "react-icons/ai";
import "react-loading-skeleton/dist/skeleton.css";
import VegNonVeg from "./utils/VegNonVeg";

const MenuCart = ({
  id,
  name,
  imageId,
  price,
  itemAttribute,
  isFirstItem, // Prop to indicate if it's the first item
}) => {
  const dispatch = useDispatch();
  // managing the item quantity
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value); //qty selected by user

    setQuantity(newQuantity);
    dispatch(updateCartItemQuantity({ id, quantity: newQuantity }));
  };

  const total = !isNaN(price) && price !== 0 ? price * quantity : 0;

  // removing an item
  const handleRemoveItem = () => {
    dispatch(removeItem(id)); // Dispatching removeItem action with the item id
  };

  // Accessing the 'vegClassifier' property from 'itemAttribute'
  const vegClassifierValue = itemAttribute && itemAttribute.vegClassifier;

  return (
    <div className="menuCartContainer w-full">
      <div className="w-full flex items-center gap-4 md:gap-3 p-4 md:p-3 bg-white border border-ink-100 rounded-2xl shadow-card mb-3 transition-shadow duration-200 hover:shadow-card-hover">
        <img
          src={IMG_CDN_URL + imageId}
          className="w-[88px] h-[88px] md:w-[64px] md:h-[64px] shrink-0 object-cover rounded-xl bg-ink-50"
          alt={name}
        />

        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <VegNonVeg itemAttribute={itemAttribute} />
            <h2 className="RestaurantName font-semibold text-ink-900 text-sm leading-snug truncate">
              {name}
            </h2>
          </div>
          <h4 className="font-bold text-ink-900 text-base">
            ₹ {(total / 100).toFixed(2)}
          </h4>
        </div>

        <div className="flex items-center gap-3 md:gap-2 shrink-0">
          <select
            aria-label={`Quantity for ${name}`}
            className="h-10 px-2 rounded-lg border border-ink-200 bg-white text-sm font-medium text-ink-900 cursor-pointer outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100 disabled:opacity-40 disabled:cursor-not-allowed"
            value={quantity}
            onChange={handleQuantityChange}
            disabled={isNaN(price) || price === 0}
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          <button
            aria-label={`Remove ${name} from cart`}
            className="h-10 w-10 flex items-center justify-center rounded-lg text-ink-300 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
            onClick={handleRemoveItem}
          >
            <AiFillDelete fontSize="20px" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCart;
