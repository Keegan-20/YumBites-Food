
import { IMG_CDN_URL } from '../constant';
import 'react-loading-skeleton/dist/skeleton.css'

const MenuCart = ({
  name,
  imageId,price,itemAttribute
  //   sla // This is the entire 'sla' object
}) => {
 // Accessing the 'vegClassifier' property from 'itemAttribute'
 const vegClassifierValue = itemAttribute && itemAttribute.vegClassifier;

//  The && (logical AND) operator is used to check if itemAttribute exists (is truthy) before attempting to access the vegClassifier property.
  //   const { deliveryTime, lastMileTravelString } = sla; // Accessing nested loo
  return (
    <div className="card w-[235px] h-[320px] bg-amber-100 rounded-lg z-10 m-3 shadow-lg  ">
      < img src={IMG_CDN_URL + imageId} className='w-full h-[180px] rounded-t-xl ' />
      <div className="card-content px-2">
        <h2 className="RestaurantName font-medium text-center">{name}</h2>
        <h4 className='font-semibold'> <i className="fa-solid fa-star bg-green-600 text-xs p-1  mb-1 mr-1 text-[#fff] rounded-[50%]"></i></h4>
        <h4>{vegClassifierValue}</h4>
       <h4>Rupees: {price/100}</h4>
      </div>
    </div>


  );

}

export default MenuCart;