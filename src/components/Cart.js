import { useSelector } from "react-redux";
import MenuCart from "./MenuCart";

const Cart = () =>{
    const cartItems=useSelector((store) => store.cart.items);

    return (
    <div className="flex flex-wrap">
        <h1 className="font-bold text-2xl text-center">Cart Items :{cartItems.length}</h1>
        {cartItems.map((item)=>(
            <MenuCart key={item.id} {...item}  />
        ))}
    </div>
    )
}

export default Cart;