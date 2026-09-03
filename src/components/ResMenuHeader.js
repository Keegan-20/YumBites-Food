import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
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

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <nav
        className="text-[0.8rem] text-ink-300 font-medium pb-3 md:hidden"
        aria-label="Breadcrumb"
      >
        <Link to="/" className="hover:text-brand-600 transition-colors">
          Home
        </Link>
        <span className="cursor-pointer"> / Central Goa / </span>
        <span className="text-ink-700 font-semibold">{name}</span>
      </nav>

      {/* Restaurant summary card */}
      <div className="w-full rounded-2xl p-6 md:p-4 bg-white border border-ink-100 shadow-card flex items-start justify-between gap-4 semimd:flex-col">
        <div className="flex flex-col gap-1.5 min-w-0">
          <h1 className="font-extrabold text-2xl md:text-xl tracking-tight text-ink-900">
            {name}
          </h1>
          <p className="text-sm text-ink-500 truncate">{cuisines?.join(", ")}</p>
          <p className="text-sm text-ink-300">
            {areaName + ", " + sla?.lastMileTravelString}
          </p>

          <div className="mt-3 flex items-center flex-wrap gap-x-5 gap-y-2 text-sm text-ink-700 font-medium">
            <p className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faClock} className="text-ink-300" />
              {sla?.slaString}
            </p>
            <p className="flex gap-2 items-center">{costForTwoMessage}</p>
          </div>

          {feeDetails?.message && (
            <div className="mt-3 pt-3 border-t border-dashed border-ink-100 flex items-center gap-2 text-sm text-ink-500">
              <img
                className="h-5 mix-blend-multiply"
                src={IMG_CDN_URL + feeDetails?.icon}
                alt=""
                aria-hidden="true"
              />
              {/* “this string is safe, you can treat it as HTML”.  */}
              <span
                className="text-sm semimd:text-xs"
                dangerouslySetInnerHTML={{ __html: feeDetails?.message }}
              ></span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-3 shrink-0 semimd:flex-row semimd:w-full semimd:justify-between">
          <img
            src={IMG_CDN_URL + cloudinaryImageId}
            className="w-[120px] h-[100px] object-cover rounded-xl shadow-card"
            alt={name}
          />

          <div className="flex flex-col rounded-xl border border-ink-100 p-2 w-24 text-center bg-white shadow-card">
            <div className="text-ink-900 text-sm font-bold border-b border-ink-100 pb-1.5 flex items-center justify-center gap-1">
              <FontAwesomeIcon icon={faStar} className="text-xs text-accent-500" />
              {avgRatingString}
            </div>
            <div className="text-ink-300 text-[0.65rem] font-semibold pt-1.5 tracking-tight">
              {totalRatingsString}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResMenuHeader;
