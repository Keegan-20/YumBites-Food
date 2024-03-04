import { useState, useEffect, useContext } from "react";
import logoImage from "../img/logo2.png";
import { HeaderShimmer } from "./Shimmer";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import useOnline from "../Custom Hooks/useOnline";
import UserContext from "./utils/UserContext";
import { useSelector } from "react-redux";

//creating a header section
export const HeaderComponent = () => {
  const [title, setTitle] = useState("YumBites Food");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const isOnline = useOnline();
  const cartItems = useSelector(store =>store.cart.items);
    console.log(cartItems);
  const {user}=useContext(UserContext);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  {
    /* condition ? expressionIfTrue : expressionIfFalse */
  }
  {
    /* <button onClick={() => title === "YumBite Foods" ? setTitle("Pops Kitchen") : setTitle("YumBite Foods")}>  Change Title</button> */
  }
  return (
    <div className="flex justify-between  sticky  top-0 h-20 w-full z-10 bg-red-400 text-white">
      {loading ? (
        <HeaderShimmer />
      ) : (
        <>
          <img  data-testid="logo" className="w-28 h-24 " src={logoImage} alt="logoImage" />

          {/* <h1 data-testid="online-status" className="py-3">{isOnline?"🟢🟢🟢": "🔴🔴🔴"}</h1> */}
          <div className="nav-items">
            <ul className="flex py-7 ">
              <Link to="/" className="nav-link">
                <li className="px-2 hover:border-b-4 border-white hover:text-black">
                  Home
                </li>
              </Link>
              
              <Link to="/about" className="nav-link">
                <li className="px-2  hover:border-b-4 border-white hover:text-black">
                  About
                </li>
              </Link>
              <Link to="/contactUs" className="nav-link">
                <li className="px-2 hover:border-b-4 border-white hover:text-black">
                  Contact us
                </li>{" "}
              </Link>
          
              <Link to="/instamart" className=" px-2 nav-link  hover:border-b-4 border-white  hover:text-black"
              >
                {" "}
                <li>F&Q</li>{" "}
              </Link>
           

            </ul>
          </div>
          {/* <h2 className="p-2 m-2 font-bold text-black">Hey {user.name} </h2> */}

          {
        
          isLoggedIn ? (
           
            <button
              className="logOut  text-sm  h-10 w-auto my-6 p-2 rounded-lg bg-slate-950"
              onClick={() => setIsLoggedIn(false)}
            >
              Logout
            </button>
          ) : (
            <button
              className="logIn my-6 p-2 w-auto h-10 last:text-sm rounded-lg bg-slate-950"
              onClick={() => setIsLoggedIn(true)}
            >
              LogIn
            </button>
        
          )}
         
             <Link to ="/cart">
             <button className="flex items-center  bg-[yellow] my-6 mx-4 p-2 px-3 rounded-md text-black" data-testid="cart">
        <span className="mr-3">
          {cartItems.length} 
        </span>
        <FaShoppingCart color="black" size="25px" />
      </button>
              </Link>
              
        </>
      )}
    </div>
  );
};
export default HeaderComponent;
