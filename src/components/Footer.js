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
        <h4 className="flex justify-center w-full max-h-14 p-2 bg-red-400 text-white" >YumBites Food &copy;2023 All Rights Reserved</h4>
        )}
</>
    );
}

export default Footer;