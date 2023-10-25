import { useState, useEffect} from "react";
import logoImage from "../img/logo.svg";
import { HeaderShimmer } from "./Shimmer"; // Named Import:
import { Link } from "react-router-dom";
import useOnline from "../Custom Hooks/useOnline";
//creating a header section
 export const HeaderComponent = () => {
  const [title,setTitle] = useState("YumBites Food")
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
   const isOnline = useOnline();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

       {/* condition ? expressionIfTrue : expressionIfFalse */}
        {/* <button onClick={() => title === "YumBite Foods" ? setTitle("Pops Kitchen") : setTitle("YumBite Foods")}>  Change Title</button> */}
    return (
        <div className="flex justify-between  sticky  top-0 max-h-14 z-10  bg-amber-500">
           {loading ? (
        <HeaderShimmer />
      ) : (   
         
        <>
          <img className="w-20 p-2" src={logoImage} alt="logoImage" />

          {/* <h1>{isOnline?"🟢": "🔴"}</h1> */}
          <div className="nav-items">
            <ul className="flex py-3 ">
              <Link to="/" className="nav-link">
                <li className="px-2">Home</li></Link>
              <Link to ="/about" className="nav-link">
                 <li className="px-2">About</li></Link>
              <Link to="/contactUs" className="nav-link">
                 <li className="px-2">Contact us</li> </Link>
              <li className="px-2">Cart</li>
              <Link to="/instamart" className="nav-link"> <li>Instamart</li> </Link>
            
            </ul>
          </div>
          {isLoggedIn ? (
            <button className="logOut" onClick={() => setIsLoggedIn(false)}>Logout</button>
          ) : (
            <button  className="logIn" onClick={() => setIsLoggedIn(true)}>LogIn</button>
          )}
        </>
      )}
    </div>
  );
};
export default HeaderComponent;