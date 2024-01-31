import { createContext } from "react";

const UserContext= createContext({
    user: {
    name:"Keegan",
    role:"frontend developer",
    state:"Goa",  
    }   
})

export default UserContext;
