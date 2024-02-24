import React from "react";
import vegIcon from "../../img/veg-icon.png";
import nonVegIcon from "../../img/non-veg-icon.png";

const VegNonVeg = ({ itemAttribute }) => {

  const vegClassifierValue = itemAttribute && itemAttribute.vegClassifier;
  return (
    <div>
      {vegClassifierValue === "VEG" ? (
        <img src={vegIcon} className="w-6 h-6" alt="veg food" />
      ) : (
        <img src={nonVegIcon} className="w-6 h-6" alt="nonVeg food" />
      )}
    </div>
  );
};

export default  VegNonVeg;
