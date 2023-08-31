import { useState,useEffect} from "react";
import { FooterShimmer } from './Shimmer';
import 'react-loading-skeleton/dist/skeleton.css';


const Footer = () => {
const [loading, setLoading] = useState(true);
useEffect(() =>{
    setTimeout(() => {
        setLoading(false)
    },2000);
},[]);
    return (
        <>
        {loading ? (
          <FooterShimmer/>
        ):(
        <h4 className="footer-text">YumBites Food &copy;2023 All Rights Reserved</h4>
        )}
</>
    );
}

export default Footer;