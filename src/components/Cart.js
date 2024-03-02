import { useDispatch, useSelector } from "react-redux";
import MenuCart from "./MenuCart";
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
  if (item && typeof item.price === 'number' && !isNaN(item.price)) {
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
        {cartItems.map((item) => (
          <MenuCart key={item.id} id={item.id} {...item} />
        ))}
         <button className="bg-red-400 text-white ml-2 p-2" onClick={handleClearCart}>Clear Cart</button>
      </div>
      <div className="totalSummary w-56 min-h-[90vh] flex flex-col bg-fuchsia-300">
        <span id="title" className="font-bold">Subtotal ({cartItems.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}> Total: ₹{subTotal / 100} </span>
        <button type="button" disabled={cartItems.length === 0} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default Cart;
