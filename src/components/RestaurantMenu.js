import React from 'react';
import {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { IMG_CDN_URL } from './constant';
const RestaurantMenu = () => {
 // dynamic routing: resid is not hard coded but whatever we pass in as param in dynamic routing initialization we can use it:-path:"/restaurant/:resid",
    const{resid} = useParams();
    const [restaurantMenu,setRestaurantMenu]= useState({});
   useEffect(()=> {
     getRestaurantInfo();
   },[]);

     async function getRestaurantInfo() {
        const data = await fetch("https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=15.4909301&lng=73.8278496&restaurantId=400030&catalog_qa=undefined&submitAction=ENTER")
        const json= await data.json();
        console.log(json);
        setRestaurantMenu(json.data);
     }
  return (
    <div>
    <h1>Restaurant id :{resid} </h1>
    <h2>{restaurantMenu.name}</h2>
    <img src={IMG_CDN_URL + restaurantMenu.cloudinaryImageId} />

 </div>
  )
}

export default RestaurantMenu