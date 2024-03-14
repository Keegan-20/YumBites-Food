import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faRupeeSign,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { IMG_CDN_URL } from "../constant.js";
import { Link } from "react-router-dom";

const ResMenuHeader = ({ restaurantOffers, restaurant }) => {
  const {
    name,
    cuisines,
    areaName,
    cloudinaryImageId,
    sla,
    feeDetails,
    avgRatingString,
    totalRatingsString,
    costForTwoMessage,
  } = restaurant;
  console.log(restaurantOffers);

  return (
    <>
      <span className="text-[0.8rem] text-gray-500 font-semibold p-2 text-left w-1/3 md:hidden ">
        <Link to="/">Home</Link>
        <span className="cursor-pointer"> / Central Goa / </span>
        <span className="text-gray-800">{name}</span>
      </span>
      <div className=" w-full md:w-auto   h-40 md:h-auto rounded-xl p-2 bg-gray-100 flex items-center justify-between ">
        <div className="flex flex-col  gap-1 px-4">
          <div className="font-bold text-xl">{name}</div>
          <div className="text-xs text-gray-400 font-medium">
            {cuisines?.join(", ")}
          </div>

          <div className="text-xs text-gray-400 font-medium">
            {areaName + ", " + sla?.lastMileTravelString}
          </div>
          <div className="mt-2 flex items-center semimd:flex-col  gap-2 text-gray-500 font-medium text-xs md:text-sm">
            {feeDetails?.message && (
              <div className="flex items-center">
              <img
                className="h-5 mix-blend-multiply"
                src={IMG_CDN_URL + feeDetails?.icon}
                alt="icon"
              />
              <span className=" text-base semimd:py-2 semimd:text-xs">{feeDetails?.message}</span>
            </div>
            )}
            <div className="ml-24 semilg:ml-2">
              <p className="flex gap-1 items-center text-sm semilg:text-xs semilg:mb-2">
                <FontAwesomeIcon icon={faClock} />
                {sla?.slaString}
              </p>
              <p className="flex gap-1 semimd:flex-row items-center text-sm semilg:text-xs">
                <FontAwesomeIcon icon={faRupeeSign} />
                {costForTwoMessage}
              </p>
            </div>
          </div>
        </div>
        <div>
          <img
            src={IMG_CDN_URL + cloudinaryImageId}
            className="w-[90px] h-[100px] semimd:w-auto semimd:h-[90px] px-1 py-3"
            alt={name}
          />

          <div className="flex flex-col gap-1 mr-4 rounded-lg border-2 p-1 md:h-14 w-24 text-center bg-gray-50 semimd:w-20">
            <div className="rounded-lg  text-green-500 text-xs  md:text-sm font-semibold md:font-bold md:border-b-2 border-b pb-1">
              <FontAwesomeIcon icon={faStar} />
              {avgRatingString}
            </div>
            <div className=" rounded-lg text-gray-400 text-[0.55rem] md:text-[0.6rem] font-semibold tracking-tighter">
              {totalRatingsString}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ResMenuHeader;
