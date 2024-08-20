// src/components/CircleLink.js
import React from "react";
import { Link } from "react-router-dom";

const CircleLink = ({ src, title, link, width = "w-28", height = "h-28" }) => {
  return (
    <Link to={link}>
      <div className="overflow-hidden flex flex-col gap-2">
        <img
          src={src}
          className={`${width} ${height} rounded-full object-cover transition-transform duration-300 hover:scale-105`}
        />
        <h3 className="text-center font-semibold transform:none ">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default CircleLink;
