import { useState } from "react";
import logoImage from "../img/logo.svg";

// Named Exports:
 const Title = () => (
    <img className="logo" src={logoImage} alt="logoImage"/>
);

//creating a header section
 export const HeaderComponent = () => {
  const [title,setTitle] = useState("YumBite Foods")
  const [isLoggedIn,setIsLoggedIn] = useState(false);
    return (
        <div className="header">
            <Title />
        <h2>{title} </h2>
       {/* condition ? expressionIfTrue : expressionIfFalse */}
        {/* <button onClick={() => title === "YumBite Foods" ? setTitle("Pops Kitchen") : setTitle("YumBite Foods")}>  Change Title</button> */}
            <div className="nav-items">
                <ul>  
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact us</li>
                    <li>Cart</li>
                   
                </ul>
            </div>
            {isLoggedIn ? ( <button onClick={() => setIsLoggedIn(false)}>Logout</button> ) : (
            <button onClick={()=> setIsLoggedIn(true)}>LogIn</button> )}
        </div>
    );
};
export default HeaderComponent;