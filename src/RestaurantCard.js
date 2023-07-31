import { IMG_CDN_URL } from "./components/constant";

const RestaurantCard = ({
    name,cuisines,
    areaName,cloudinaryImageId,
    locality,
}) => {
return (
        <div className="card">
            <img src={IMG_CDN_URL + cloudinaryImageId} />
           <div className="card-content">
            <h2 className="RestaurantName">{name}</h2>
            {/* <h3>{cuisines.join(",")}</h3> */}
            <p>{locality } </p>
            <p>{areaName}</p>
 
            </div>
        </div>


);
}
 export default RestaurantCard;