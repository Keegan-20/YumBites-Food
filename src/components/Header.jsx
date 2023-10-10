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
        <div className="header">
           {loading ? (
        <HeaderShimmer />
      ) : (
        <>
          <img className="logo" src={logoImage} alt="logoImage" />
          <h2>{title}</h2>
          {/* <h1>{isOnline?"🟢": "🔴"}</h1> */}
          <div className="nav-items">
            <ul>
              <Link to="/" className="nav-link"><li>Home</li></Link>
              <Link to ="/about" className="nav-link"> <li>About</li></Link>
              <Link to="/contactUs" className="nav-link"> <li>Contact us</li> </Link>
              <li>Cart</li>
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