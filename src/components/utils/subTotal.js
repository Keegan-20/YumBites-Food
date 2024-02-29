import React from "react";

const SubTotal = ({ total }) => {
  return (
    <div className="totalContainer bg-zinc-400 flex flex-col">
      <h3>Sub total: ₹{total / 100}</h3>
    </div>
  );
};

export default SubTotal;
