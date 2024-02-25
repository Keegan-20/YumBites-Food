import { useDispatch, useSelector } from "react-redux";
import MenuCart from "./MenuCart";
import { clearCart } from "./utils/cartSlice";

const Cart = () =>{
    const cartItems=useSelector((store) => store.cart.items);

    dispatch= useDispatch();
    // Function to handle clearing the cart
     const handClearCart = () => {
        // Dispatching the clearCart action
        dispatch(clearCart()); 
     }   
     
     return (
    <div >
        {/* <h1 className="font-bold text-2xl text-center">Cart Items :{cartItems.length}</h1> */}
        <button className="bg-red-400 text-white ml-2 p-2 " onClick={()=>handClearCart()}>Clear Cart</button>
        <div className="flex flex-wrap">
        {cartItems.map((item)=>(
            <MenuCart key={item.id} {...item}  />
        ))}
        </div>
    </div>
    )
}

export default Cart;