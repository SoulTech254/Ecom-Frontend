import { Bike, ShoppingBasket, Truck } from "lucide-react";
import React, { useState } from "react";

const DeliveryMethod = ({ onMethodChange }) => {
  const [activeTab, setActiveTab] = useState("normal");

  // Function to handle tab selection
  const handleTabChange = (method) => {
    setActiveTab(method);
    onMethodChange(method); // Notify parent component of selected method
  };

  return (
    <div className="bg-[#FAF0E660] border p-2 rounded-lg mt-3">
      <div className="flex">
        <div
          className={`flex-1 flex justify-center p-2 rounded-lg cursor-pointer ${
            activeTab === "normal" ? "bg-white" : ""
          }`}
          onClick={() => handleTabChange("normal")}
        >
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="deliveryMethod"
              value="normal"
              checked={activeTab === "normal"}
              onChange={() => handleTabChange("normal")}
              className="sr-only"
            />
            <Truck />
            <span className="ml-2">Normal Delivery</span>
          </label>
        </div>
        <div
          className={`flex-1 flex justify-center p-2 rounded-lg cursor-pointer ${
            activeTab === "express" ? "bg-white" : ""
          }`}
          onClick={() => handleTabChange("express")}
        >
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="deliveryMethod"
              value="express"
              checked={activeTab === "express"}
              onChange={() => handleTabChange("express")}
              className="sr-only"
            />
            <Bike />
            <span className="ml-2">Express Delivery</span>
          </label>
        </div>
        <div
          className={`flex-1 flex justify-center p-2 rounded-lg cursor-pointer ${
            activeTab === "pick-up" ? "bg-white" : ""
          }`}
          onClick={() => handleTabChange("pick-up")}
        >
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="deliveryMethod"
              value="pick-up"
              checked={activeTab === "pick-up"}
              onChange={() => handleTabChange("pick-up")}
              className="sr-only"
            />
            <ShoppingBasket />
            <span className="ml-2">Pick Up at Store</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default DeliveryMethod;
