import { createContext } from "react";

const UserContext= createContext({
    user: {
    name:"Jude",
    role:"frontend developer",
    state:"Goa",  
    }   
})

export default UserContext;
