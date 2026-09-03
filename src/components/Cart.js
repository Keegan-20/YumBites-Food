import { useDispatch, useSelector } from "react-redux";
import MenuCart from "./MenuCart";
import EmptyCart from "../img/EmptyCart.jpg";
import { FaLongArrowAltRight } from "react-icons/fa";
import { GrUndo } from "react-icons/gr";
import { toast } from "react-toastify";
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
    <div className="mainContainer max-w-6xl mx-auto px-6 md:px-4 animate-fade-in">
      {cartItems.length === 0 ? (
        <div className="Empty-cart min-h-[60vh] mb-0 flex items-center justify-center flex-col gap-4 text-center">
          <img
            className="h-72 md:h-52 sm:h-36 rounded-2xl"
            src={EmptyCart}
            alt="CartEmpty"
          />
          <p className="text-2xl md:text-lg font-bold text-ink-900">
            Your cart is empty
          </p>
          <p className="text-ink-500 text-sm">
            Good food is just a few clicks away.
          </p>
          <a
            href="/"
            className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm transition-all duration-200 active:scale-[0.98]"
          >
            <GrUndo /> Back to Home
          </a>
        </div>
      ) : (
        <div className="mainCart flex md:flex-col items-start gap-8 md:gap-4 mt-8 md:mt-5 mb-0">
          {/* Items list */}
          <div className="menuItems flex-1 w-full min-w-0">
            <div className="flex items-center justify-between mb-5">
              <h1 className="font-extrabold text-2xl md:text-xl tracking-tight text-ink-900">
                Your Cart
                <span className="ml-2 text-sm font-semibold text-ink-300 align-middle">
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                </span>
              </h1>
              <button
                className="text-sm font-semibold text-red-600 hover:text-white hover:bg-red-600 border border-red-200 rounded-full px-4 py-2 transition-colors duration-200"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>

            {cartItems.map((item, index) => (
              <MenuCart
                key={item.id}
                id={item.id}
                isFirstItem={index === 0}
                {...item}
              />
            ))}
          </div>

          {/* Order summary */}
          <div className="totalSummary w-80 md:w-full shrink-0 sticky top-24 md:static bg-white border border-ink-100 rounded-2xl shadow-card p-6 md:p-5 flex flex-col gap-4">
            <span id="title" className="font-bold text-lg text-ink-900">
              Order Summary
            </span>

            <div className="flex justify-between text-sm text-ink-500">
              <span>Subtotal ({cartItems.length} items)</span>
              <span className="font-semibold text-ink-900">
                ₹{subTotal / 100}
              </span>
            </div>
            <div className="flex justify-between text-sm text-ink-500">
              <span>Delivery</span>
              <span className="font-semibold text-brand-700">Free</span>
            </div>

            <div className="border-t border-dashed border-ink-100 pt-4 flex justify-between items-baseline">
              <span className="font-bold text-ink-900">Total</span>
              <span className="font-extrabold text-xl text-ink-900">
                ₹{subTotal / 100}
              </span>
            </div>

            <button
              type="button"
              disabled={cartItems.length === 0}
              className="w-full h-12 flex items-center justify-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={() => toast.success("Checked out successfully")}
            >
              <span className="md:hidden">Proceed to Checkout</span>
              <span className="hidden md:inline">Checkout</span>
              <FaLongArrowAltRight />
            </button>
            <p className="text-[11px] text-ink-300 text-center">
              Taxes calculated at checkout · Secure payment
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
