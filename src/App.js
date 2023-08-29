import React from "react";
import ReactDOM from "react-dom/client";
//default import
import HeaderComponent from "./components/Header";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Body from "./components/Body";
import Footer from "./components/Footer";

//Named import
import { Title } from "./components/Header";
import { SkeletonTheme } from "react-loading-skeleton";
//we can write .js or jsx one at the same

const AppLayout = () => {
    return (
        //  {/* ----//React fragment   */}
        <>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <HeaderComponent />
            <Body />
            <Footer />
         </SkeletonTheme>
        </>

    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppLayout />)

