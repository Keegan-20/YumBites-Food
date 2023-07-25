import React from "react";
import ReactDOM from "react-dom/client";
//default import
import HeaderComponent from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

//Named import
import { Title } from "./components/Header";
//we can write .js or jsx one at the same

const AppLayout = () => {
    return (
        //  {/* ----//React fragment   */}
        <>
            <HeaderComponent />
            <Body />
            <Footer />
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppLayout />)

