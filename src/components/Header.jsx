import { useState, useEffect, useContext } from "react";
import logoImage from "../img/logo2.png";
import { HeaderShimmer } from "./Shimmer";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillCartFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useOnline from "../Custom Hooks/useOnline";
import UserContext from "./utils/UserContext";
import { useSelector } from "react-redux";

//creating a header section
export const HeaderComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const isOnline = useOnline();
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);
  const { user } = useContext(UserContext);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  {
    /* <button onClick={() => title === "YumBite Foods" ? setTitle("Pops Kitchen") : setTitle("YumBite Foods")}>  Change Title</button> */
  }
  //responsive NavBar
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  //nav-items
  const navmenu = [
    {
      link: "/",
      name: "Home",
    },

    {
      link: "/about",
      name: "About",
    },
    {
      link: "/contactUS",
      name: "Contact",
    },
    {
      link: "/instamart",
      name: "F&Q",
    },
  ];
  return (
    <nav className="flex justify-between  sticky  top-0 h-20 w-full z-10 bg-slate-800 text-white ">
      <div className="w-28 h-20 p-2 flex items-center justify-center ">
        <NavLink to="/">
          <img src={logoImage} alt="Logo" />
        </NavLink>
      </div>

      {/* Mobile Menu */}
      <div className= "p-2 md:hidden">
        {isMenuOpen === true ? (
          <IoMdClose className="text-3xl cursor-pointer" onClick={toggleMenu} />
        ) : (
          <GiHamburgerMenu
            className="text-2xl cursor-pointer"
            onClick={toggleMenu}
          />
        )}
        {isMenuOpen && (
          <ul className="absolute h-80 top-20 left-0 right-0 flex flex-col justify-evenly items-center bg-slate-600 shadow-md pb-5 z-20 ">
            {navmenu.map((menu) => {
              return (
                <li key={menu.name}>
                  <NavLink
                    to={menu.link}
                    activeclassname="text-green-700"
                    className="text-xl font-medium p-2"
                    onClick={toggleMenu}
                  >
                    {menu.name}
                  </NavLink>
                </li>
              );
            })}

            <li>
              <NavLink
                to="/cart"
                className="flex relative"
                onClick={toggleMenu}
              >
                <button
                  className="flex items-center bg-[yellow] my-6 mx-2 p-2 rounded-md text-black"
                  data-testid="cart"
                >
                  <span className="mr-3">{cartItems.length}</span>
                  <FaShoppingCart color="black" size="25px" />
                </button>
              </NavLink>
            </li>
          </ul>
        )}
      </div>

      {/* Desktop Menu */}
      <ul className="hidden  py-7 md:flex  ">
        {navmenu.map((menu, idx) => {
          return (
            
            <li key={idx} className="px-2 hover:border-b-4 hover:text-orange-400">
              <NavLink
                to={menu.link}
                activeclassname="text-green-700"
                className="text-[20px] p-2"
              >
                {menu.name}
              </NavLink>
            </li>
          );
        })}
  </ul>
        <div className="flex items-center ">
          {isLoggedIn ? (
            <button
              className="logOut  text-sm  w-16 mx-4  p-2 rounded-md bg-slate-900"
              onClick={() => setIsLoggedIn(false)}
            >
              Logout
            </button>
          ) : (
            <button
              className="logIn my-6 p-2 mx-4 w-16 last:text-sm rounded-md bg-slate-950"
              onClick={() => setIsLoggedIn(true)}
            >
              LogIn
            </button>
          )}
          <li>
            <NavLink to="/cart">
              <button
                className="flex items-center bg-[yellow] my-6 mx-2 p-2 rounded-md text-black"
                data-testid="cart"
              >
                <span className="mr-3">{cartItems.length}</span>
                <FaShoppingCart color="black" size="25px" />
              </button>
            </NavLink>
          </li>
        </div>
    
    </nav>
  );
};

export default HeaderComponent;
