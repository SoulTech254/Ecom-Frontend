import React from "react";

const SkeletonCard = () => {
  return (
    <div className="animate-pulse w-[190px] h-[330px] bg-gray-200 rounded-md shadow-md">
      <div className="bg-gray-300 h-40 rounded-md"></div>
      <div className="mt-4">
        <div className="bg-gray-300 h-4 w-3/4 rounded-md"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded-md mt-2"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
