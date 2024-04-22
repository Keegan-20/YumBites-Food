import { useDispatch, useSelector } from "react-redux";
import MenuCart from "./MenuCart";
import { FaLongArrowAltRight } from "react-icons/fa";
import { clearCart } from "./utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  // Function to handle clearing the cart
  const handleClearCart = () => {
    // Dispatching the clearCart action
    dispatch(clearCart());
  };

  // Function to calculate total price for a single item
  const calculateTotalPrice = (item) => {
    // Check if item has a valid price
    if (item && typeof item.price === "number" && !isNaN(item.price)) {
      // If price is valid, calculate total price
      return item.price * item.quantity;
    } else {
      // If price is not valid, return 0
      return 0;
    }
  };

  // Calculate subtotal for all items in the cart
  const subTotal = cartItems.reduce((acc, item) => {
    return acc + calculateTotalPrice(item);
  }, 0);

  return (
    <div className="mainContainer ">
      {/* <h1 className="font-bold text-2xl text-center">Cart Items: {cartItems.length}</h1> */}

      <div className="mainCart flex ">
        <div className="menuItems pt-5 flex-grow">
          {cartItems.map((item,index) => (
            <MenuCart key={item.id} id={item.id} isFirstItem={index === 0} {...item}  />
          ))}
          <button
            className="bg-red-400 text-white ml-2 p-2"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>
        <div className="totalSummary w-56 md:w-full min-h-[90vh] flex flex-wrap flex-col md:flex-row md:min-h-1 md:absolute md:top-18 md:p-5 bg-[#252525] text-white p-3">
          <span id="title" className="font-bold text-lg  md:text-base pb-3">
            Subtotal ({cartItems.length}) items
          </span>
          <span className="font-bold text-xl md:text-base pb-3 md:px-5">
            {" "}
            Total: ₹{subTotal / 100}{" "}
          </span>

          <div className="pt-10 md:pt-0  md:ml-[10rem] semimd:ml-[2rem] sm:ml-2">
            <button
              type="button"
              disabled={cartItems.length === 0}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 md:py-2 px-4 md:px-2 rounded flex items-center "
            >
              <span className="md:hidden">Proceed to Checkout</span>
              <span className="hidden md:inline">Checkout</span>
              <FaLongArrowAltRight className=" hidden md:inline ml-2 " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
