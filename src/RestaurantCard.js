import { IMG_CDN_URL } from "./components/constant";

const RestaurantCard = ({
    name,avgRating,
    areaName,cloudinaryImageId,
    locality,
}) => {
return (
        <div className="card">
            < img src={IMG_CDN_URL + cloudinaryImageId} />
           <div className="card-content">
            <h2 className="RestaurantName">{name}</h2>
            <div className="sub-content">
            <p>{locality } </p>
            <p>{areaName}</p>
            <h3>{avgRating}</h3>
         </div>
     </div>
</div>


);
}
 export default RestaurantCard;