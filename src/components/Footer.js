import { useState, useEffect, useContext } from "react";
import { FooterShimmer } from "./Shimmer";
import "react-loading-skeleton/dist/skeleton.css";
import UserContext from "./utils/UserContext";

const Footer = () => {
  const [loading, setLoading] = useState(true);
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
        <footer data-testid="footer">
          <h4 className="flex justify-center w-full fixed bottom-0 max-h-14 p-2 bg-red-400 text-white">
            YumBites Food &copy;2023 All Rights Reserved
            {/* have used useContext hook  */}
            <span className="ml-40">Develped by ❤️{user.name}❤️</span>
          </h4>
        </footer>
      )}
    </>
  );
};

export default Footer;
