import React from "react";
import ReactDOM from "react-dom/client";
//default import
import HeaderComponent from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import About from "./components/About";
import Error from "./components/Error";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
//Named import
import { Title } from "./components/Header";
import { SkeletonTheme } from "react-loading-skeleton";
//we can write .js or jsx one at the same

const AppLayout = () => {
    return (
        //  {/* ----//React fragment   */}
        <>
  
            <HeaderComponent />
            <Body />
            <Footer/>
         
        </>

    );
};
        // React Router - creating the router
const appRouter = createBrowserRouter([
    {
         path:"/",
         element:<AppLayout/>,
         errorElement:<Error/>,
    },
    {
        path:"/about",
        element:<About/>,
    },
   
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />)

