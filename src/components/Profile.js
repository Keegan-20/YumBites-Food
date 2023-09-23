import { useState } from "react";

const Profile = () => {
  const[count]=useState(0);
    return(
        <div>
            <h2>Profile Component</h2>
            <h3>Count:{count}</h3>
        </div>
    )
   
}

export default Profile;