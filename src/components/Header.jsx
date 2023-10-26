import { useState, useEffect } from "react";
import logoImage from "../img/logo.svg";
import { HeaderShimmer } from "./Shimmer"; // Named Import:
import { Link } from "react-router-dom";
import useOnline from "../Custom Hooks/useOnline";
//creating a header section
export const HeaderComponent = () => {
  const [title, setTitle] = useState("YumBites Food");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const isOnline = useOnline();
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
    <div className="flex justify-between  sticky  top-0 max-h-14 z-10 bg-red-400 text-white">
      {loading ? (
        <HeaderShimmer />
      ) : (
        <>
          <img className="w-20 p-2" src={logoImage} alt="logoImage" />

          {/* <h1>{isOnline?"🟢": "🔴"}</h1> */}
          <div className="nav-items">
            <ul className="flex py-3 ">
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
              <li className="px-2  hover:border-b-4 border-white hover:text-black">
                Cart
              </li>
              <Link
                to="/instamart"
                className=" px-2 nav-link  hover:border-b-4 border-white  hover:text-black"
              >
                {" "}
                <li>Instamart</li>{" "}
              </Link>
            </ul>
          </div>
          {isLoggedIn ? (
            <button
              className="logOut text-sm p-2 m-2 rounded-lg bg-slate-950"
              onClick={() => setIsLoggedIn(false)}
            >
              Logout
            </button>
          ) : (
            <button
              className="logIn m-2 p-2  last:text-sm rounded-lg bg-slate-950"
              onClick={() => setIsLoggedIn(true)}
            >
              LogIn
            </button>
          )}
        </>
      )}
    </div>
  );
};
export default HeaderComponent;
