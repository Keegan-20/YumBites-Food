import { useState, useEffect, useContext } from "react";
import { FooterShimmer } from "./Shimmer";
import "react-loading-skeleton/dist/skeleton.css";
import UserContext from "./utils/UserContext";

const Footer = () => {
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();
  const { user } = useContext(UserContext);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {loading ? (
        <FooterShimmer />
      ) : (
        <footer data-testid="footer" className="bg-[#6D2E0F] md:bg-[#804527] text-white  fixed bottom-0 left-0 w-full mt-3  over">
      <div className="container mx-auto py-3">
        <div className="flex md:flex-col justify-between items-center">
          <span className="md:text-center text-left mb-2 pl-2 sm:text-xs">
            YumBites Food &copy; {currentYear} All Rights Reserved
          </span>
          {/* have used useContext hook  */}
          <span className="text-center pr-2 md:pr-0 md:pb-0 sm:text-xs">
  Developed by{" "}
  <a
    href="https://www.linkedin.com/in/keegan-colaco20"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:underline hover:text-black"
  >
    ❤️{user.name}❤️
  </a>
</span>
        </div>
      </div>
    </footer>
      
      
      )}
    </>
  );
};

export default Footer;
