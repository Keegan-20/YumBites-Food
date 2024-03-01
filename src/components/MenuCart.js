import { useState,useSelector } from "react";
import { useDispatch } from "react-redux";
import { updateCartItemQuantity } from "./utils/cartSlice";
import { IMG_CDN_URL } from "../constant";
import "react-loading-skeleton/dist/skeleton.css";
import VegNonVeg from "./utils/VegNonVeg";

const MenuCart = ({
  name,
  imageId,
  price,
  itemAttribute,
  
  //   sla // This is the entire 'sla' object
}) => {
  // const cartItems=useSelector((store) => store.cart.items);

  // managingh the item quantity
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
    dispatch(
      updateCartItemQuantity({
        itemId: itemAttribute.id,
        quantity: newQuantity,
      })
    );
  };
  const total = price * quantity;

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
          <div className="flex justify-center items-center  p-2 ">
            <h2 className="RestaurantName flex p-2   font-medium text-center">
              {name}
            </h2>
            <h4 className="font-semibold p-5">
              <VegNonVeg itemAttribute={itemAttribute} />
            </h4>
            <h4 className="p-5">{vegClassifierValue} </h4>
            <h4 className="p-5">₹{total / 100} </h4>
            <select className="border" value={quantity} onChange={handleQuantityChange}>
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCart;
