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
        <footer
          data-testid="footer"
          className="bg-brand-900 text-white mt-20 md:mt-14"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-4 py-7 md:py-6">
            <div className="flex md:flex-col justify-between items-center gap-1">
              <span className="text-sm sm:text-xs text-white/60">
                &copy; {currentYear}{" "}
                <span className="font-display font-semibold text-white">
                  Yum<span className="text-accent-400">Bites</span>
                </span>
                . All rights reserved.
              </span>
              {/* have used useContext hook  */}
              <span className="text-sm sm:text-xs text-white/60">
                Designed &amp; built by{" "}
                <a
                  href="https://www.linkedin.com/in/keegan-colaco20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-white underline underline-offset-4 decoration-white/25 hover:text-accent-300 hover:decoration-accent-300 transition-colors duration-200"
                >
                  {user.name}
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
