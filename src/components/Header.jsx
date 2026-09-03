import { useState, useEffect, useContext } from "react";
import logoImage from "../img/logo1.png";
import { HeaderShimmer } from "./Shimmer";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import UserContext from "./utils/UserContext";
import { useSelector } from "react-redux";

//creating a header section
export const HeaderComponent = () => {
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((store) => store.cart.items);
  const { user } = useContext(UserContext);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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

  const navLinkClasses = ({ isActive }) =>
    `relative px-3.5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-brand-700 bg-brand-50 font-semibold"
        : "text-ink-500 hover:text-ink-900 hover:bg-cream-100"
    }`;

  const CartButton = ({ size = "20px", onClick }) => (
    <button
      className="relative flex items-center gap-2 bg-brand-600 hover:bg-brand-700 active:scale-[0.98] transition-colors duration-200 text-white font-semibold text-sm px-5 py-2.5 rounded-full"
      data-testid="cart"
      aria-label={`Cart, ${cartItems.length} items`}
      onClick={onClick}
    >
      <FaShoppingCart size={size} />
      <span>Cart</span>
      {cartItems.length > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full bg-accent-600 text-white text-[11px] font-bold ring-2 ring-cream-50">
          {cartItems.length}
        </span>
      )}
    </button>
  );

  return (
    <nav className="sticky top-0 z-50 w-full h-16 bg-cream-50/85 backdrop-blur-md border-b border-cream-300">
      <div className="h-full w-full max-w-7xl mx-auto px-6 md:px-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 shrink-0" aria-label="YumBites home">
          <img
            src={logoImage}
            alt="YumBites logo"
            className="h-10 w-10 object-contain"
          />
          <span className="font-display text-2xl font-semibold tracking-tight text-ink-900 semism:hidden">
            Yum<span className="text-brand-600">Bites</span>
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="flex items-center gap-1 semimd:hidden">
          {navmenu.map((menu, idx) => {
            return (
              <li key={idx}>
                <NavLink to={menu.link} className={navLinkClasses}>
                  {menu.name}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Desktop cart */}
        <div className="flex items-center gap-3 semimd:hidden">
          <NavLink to="/cart">
            <CartButton />
          </NavLink>
        </div>

        {/* Mobile Menu */}
        <div className="hidden semimd:flex items-center gap-3">
          <NavLink to="/cart">
            <CartButton size="16px" />
          </NavLink>

          <button
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className={`h-11 w-11 flex items-center justify-center rounded-full text-ink-900 hover:bg-ink-50 transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          >
            {isMenuOpen === true ? (
              <IoMdClose className="text-2xl cursor-pointer" onClick={toggleMenu} />
            ) : (
              <GiHamburgerMenu className="text-xl cursor-pointer" onClick={toggleMenu} />
            )}
          </button>

          {isMenuOpen && (
            <ul className="absolute left-0 right-0 top-20 z-10 mx-4 p-3 flex flex-col gap-1 rounded-2xl bg-white shadow-float border border-cream-300 animate-slide-down">
              {navmenu.map((menu) => {
                return (
                  <li key={menu.name}>
                    <NavLink
                      to={menu.link}
                      className={({ isActive }) =>
                        `block w-full px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                          isActive
                            ? "text-brand-700 bg-brand-50"
                            : "text-ink-700 hover:bg-cream-100"
                        }`
                      }
                      onClick={toggleMenu}
                    >
                      {menu.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;
