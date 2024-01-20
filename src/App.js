import React, { lazy, Suspense, useState } from 'react';
import ReactDOM from "react-dom/client";
//default import
import HeaderComponent from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Profile from './components/Profile';
import Cart from './components/Cart';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
//Named import
import Shimmer from './components/Shimmer';
import UserContext from './components/utils/UserContext';
import { Provider } from 'react-redux';
import store from './components/utils/store';
//we can write .js or jsx one at the same

//optimizing the react app:
// chunking, Code Splitting,dynamic bundling,Laxy loading,on Demand Loading,Dynamic Import
const Instamart = lazy(() => import("./components/Instamart")); //lazy import
const About = lazy(() => import("./components/About"));
const AppLayout = () => {
    const[user,setUser]=useState({
        name:"Keegan Colaco",
        email:"key@gmail.com"
    });
    return (
        //  {/* ----//React fragment   */}
        <Provider store={store}>
        <UserContext.Provider value={{
            user:user,
        }}>
            <HeaderComponent />
            <Outlet /> {/* Outlet is a component that serves as a placeholder where child routes can be rendered.*/} 
            <Footer />

        </UserContext.Provider>
        </Provider>
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
                element: <Body/>,
            },

            {
                path: "/about",
                element: <Suspense fallback={<h1>Loading....</h1>}>
                <About />,
                </Suspense>,
                children:[{
                    path:"profile", //children of children: localhostl:1234/about/profile
                    element:<Profile/>,
                }],
            },

            {
                path: "/contactUs",
                element: <Contact />,
            },
            // dynamic Routing
          {
            path:"/restaurant/:resId", //dynamic id will be used using useParams
            element:<RestaurantMenu />,
          },
          {
            path:"/cart",
            element:<Cart/>,
        },
          {
            path:"/instamart",       
     // Suspense is a special component in React that allows you to suspend rendering while some asynchronous work is being done
            element: <Suspense fallback={<Shimmer/>} >
            <Instamart />
            </Suspense>
          },
        ],
    },
 
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />)

