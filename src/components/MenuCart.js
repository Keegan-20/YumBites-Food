
import { IMG_CDN_URL } from '../constant';
import 'react-loading-skeleton/dist/skeleton.css';
import VegNonVeg from './utils/VegNonVeg';

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
    <div className='menuCartContainer flex w-full h-full'>
    <div className="restaurantItem flex  justify-between items-center w-[70%] m-auto  border border-indigo-100 rounded-lg mb-4 shadow-lg">
      <img src={IMG_CDN_URL + imageId} className='w-[130px] h-[100px] p-2 rounded-lg bg-fuchsia-300' alt={name} />
      <div className="card-content m-auto flex justify-between items-center px-2">
        <div className=' flex '>
          <h2 className="RestaurantName flex justify-between mr-2 font-medium text-center">{name}</h2>
          <h4 className='font-semibold mr-5'>
           <VegNonVeg itemAttribute={itemAttribute} /> 
          </h4>
          <h4 className='mr-5 '>{vegClassifierValue} </h4>
        <h4 className='mr-5 '>₹{price/100} </h4>
        </div>


      </div>
    </div>
  </div>
  

  );

}

export default MenuCart;