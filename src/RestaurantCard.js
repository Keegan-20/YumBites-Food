import { IMG_CDN_URL } from "./components/constant";

const RestaurantCard = ({
    name,cuisines,
    area,cloudinaryImageId,
    lastMileTravelString,
}) => {
return (

        <div className="card">
            <img src={IMG_CDN_URL + cloudinaryImageId} />
           <div className="card-content">
            <h2 className="RestaurantName">{name}</h2>
            <h3>{cuisines.join(",")}</h3>
            <p>{area} </p>
            <h4>{lastMileTravelString} minutes</h4>
            </div>
        </div>
);
}
 export default RestaurantCard;