import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCartItemQuantity,removeItem } from "./utils/cartSlice";
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
}) => {
  const dispatch = useDispatch();
  // managing the item quantity
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value); //qty selected by user

    setQuantity(newQuantity);
    dispatch(updateCartItemQuantity({ id, quantity: newQuantity }));
  };

  const total = price * quantity; //price calculation for each item depending on qty

// removing an item
const handleRemoveItem = () => {
  dispatch(removeItem(id)); // Dispatching removeItem action with the item id
};

  // Accessing the 'vegClassifier' property from 'itemAttribute'
  const vegClassifierValue = itemAttribute && itemAttribute.vegClassifier;

  //  The && (logical AND) operator is used to check if itemAttribute exists (is truthy) before attempting to access the vegClassifier property.
  //   const { deliveryTime, lastMileTravelString } = sla; // Accessing nested loo
  return (
    <div className="menuCartContainer">
      <div className=" flex  justify-between items-center w-[70%] m-auto  border rounded-lg mb-3 shadow-lg ">
        <div className="card-content flex  items-center justify-around p-1 ">
          <img
            src={IMG_CDN_URL + imageId}
            className="w-[130px] h-[100px] p-2 rounded-lg bg-fuchsia-300"
            alt={name}
          />
          <div className="flex justify-center items-center p-2 ">
            <h2 className="RestaurantName flex p-2 w-48 font-medium text-center">
              {name}
            </h2>
            <h4 className="font-semibold m-5">
              <VegNonVeg itemAttribute={itemAttribute} />
            </h4>
            <h4 className="w-20 m-5">{vegClassifierValue} </h4>
            <h4 className="w-24 p-2">₹ {(total / 100).toFixed(2)} </h4>
            <select
              className="border m-5"
              value={quantity}
              onChange={handleQuantityChange}
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
            <button className="m-5" onClick={() =>{handleRemoveItem()}}>  
            <AiFillDelete fontSize="20px" />
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCart;
