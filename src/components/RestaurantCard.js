import { useContext } from 'react';
import { IMG_CDN_URL } from '../constant';
import 'react-loading-skeleton/dist/skeleton.css'
import UserContext from './utils/UserContext';

const RestaurantCard = ({
  name, avgRating, cuisines, // this are props
  cloudinaryImageId,
  locality,
  sla // This is the entire 'sla' object
}) => {
  const { user } = useContext(UserContext);
  const { deliveryTime } = sla; // Accessing nested loop
  return (
    <div className="card group w-[260px] semism:w-[300px] m-3 bg-white rounded-2xl overflow-hidden shadow-card transition-all duration-300 ease-out hover:shadow-card-hover hover:-translate-y-1 cursor-pointer">
      {/* Image */}
      <div className="relative h-[170px] overflow-hidden">
        <img
          src={IMG_CDN_URL + cloudinaryImageId}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent"
          aria-hidden="true"
        ></div>
        <span className="absolute bottom-2 left-3 text-white text-xs font-bold tracking-wide uppercase">
          {deliveryTime} mins
        </span>
      </div>

      {/* Content */}
      <div className="card-content px-4 py-3 flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <h2 className="RestaurantName font-bold text-[0.95rem] text-ink-900 leading-snug truncate">
            {name}
          </h2>
          <h4 className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-ink-900 text-white text-xs font-bold">
            <i className="fa-solid fa-star text-[0.6rem] text-accent-400" aria-hidden="true"></i>
            {avgRating}
          </h4>
        </div>

        <div className="sub-content flex flex-col gap-0.5">
          <p className="cuisines text-sm text-ink-500 truncate">
            {cuisines.slice(0, 4).join(", ")}
          </p>
          <p className="text-sm text-ink-300 truncate">{locality}</p>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;
