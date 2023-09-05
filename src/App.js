import React from "react";
import ReactDOM from "react-dom/client";
//default import
import HeaderComponent from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
//Named import
import { Title } from "./components/Header";
import { SkeletonTheme } from "react-loading-skeleton";
//we can write .js or jsx one at the same

const AppLayout = () => {
    return (
        //  {/* ----//React fragment   */}
        <>
            <HeaderComponent />
            <Outlet /> {/* child routes */} 
            <Footer />

        </>

    );
};
// React Router - creating the router
const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Body />,
            },

            {
                path: "/about",
                element: <About />,
            },

            {
                path: "/contactUs",
                element: <Contact />,
            },
            // dynamic Routing
          {
            path:"/restaurant/:resid",
            element:<RestaurantMenu />,
          },
        ],
    },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />)

