import { useEffect, useState } from "react";

//To check if user is online or offline
const useOnline = () => {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
        }

        const handleOffine = () => { 
            setIsOnline(false);
        }

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffine);

        //componenetDid Unmount the event listeners
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffine);
        };
    }, []);

    return isOnline; //Returns true or false
}

export default useOnline;