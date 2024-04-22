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
    <div className={`menuCartContainer  flex md:flex-wrap md:mx-3 ${isFirstItem ? 'md:mt-20 semism:mt-[8rem] sm:mt-36' : ''}`}>
      <div className=" flex  justify-between items-center max-w-[70%] md:max-w-full m-auto md:mx-auto  border rounded-lg mb-3 shadow-lg ">
        <div className="card-content flex flex-wrap items-center justify-around p-1 ">
          <div className="flex  flex-wrap md:shadow-black  justify-center items-center p-2 ">
            <img
              src={IMG_CDN_URL + imageId}
              className="w-[130px] h-[100px] md:w-[80px] md:h-[80px] p-2 rounded-lg bg-fuchsia-300"
              alt={name}
            />
            <h2 className="RestaurantName flex p-2 w-48 md:w-full font-medium justify-center align-middle">
              {name}
            </h2>
            <h4 className="font-semibold m-5 md:m-1">
              <VegNonVeg itemAttribute={itemAttribute} />
            </h4>
            <h4 className="w-20 m-5 md:m-1">{vegClassifierValue} </h4>
            <h4 className="w-24 p-2 ">₹ {(total / 100).toFixed(2)} </h4>
            <select
              className="border m-5 md:mr-3"
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
            <button className="m-5 md:m-1" onClick={handleRemoveItem}>  
              <AiFillDelete  className="hover:text-[red]" fontSize="20px" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCart;
