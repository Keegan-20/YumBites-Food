import { useState, useEffect} from "react";
import logoImage from "../img/logo.svg";
import { HeaderShimmer } from "./Shimmer"; // Named Import:

//creating a header section
 export const HeaderComponent = () => {
  const [title,setTitle] = useState("YumBites Food")
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
          <div className="nav-items">
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Contact us</li>
              <li>Cart</li>
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