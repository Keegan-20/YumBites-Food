import { useContext } from 'react';
import { IMG_CDN_URL } from '../constant';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import UserContext from './utils/UserContext';

const RestaurantCard = ({
  name, avgRating, cuisines, // this are props
  cloudinaryImageId,
  locality
  //   sla // This is the entire 'sla' object
}) => {
  const { user} = useContext(UserContext);
  //   const { deliveryTime, lastMileTravelString } = sla; // Accessing nested loo
  return (
    <div className="card w-[235px] h-[300px] bg-amber-100 rounded-lg z-10 m-3 shadow-xl ">
      < img src={IMG_CDN_URL + cloudinaryImageId} className='w-full h-[155px] rounded-t-xl ' />
      <div className="card-content px-2">
        <h2 className="RestaurantName font-medium text-center">{name}</h2>
        <h4 className='font-semibold'> <i className="fa-solid fa-star bg-green-600 text-xs p-1  mb-1 mr-1 text-[#fff] rounded-[50%]"></i> {avgRating}</h4>

        <div className="sub-content">
          <p>{locality} </p>
          <p className="cuisines text-sm font-medium">{cuisines.slice(0, 4).join(", ")}</p>
          <h5>{user.state}</h5>
        </div>
      </div>
    </div>
    
  );

}

export default RestaurantCard;