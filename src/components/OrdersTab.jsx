import { Truck, CheckCircle, XCircle, Loader } from "lucide-react";
import React, { useState } from "react";

const OrderTabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("pending");

  // Function to handle tab selection
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onTabChange(tab); // Notify parent component of selected tab
  };

  return (
    <div className="bg-gray-100 border rounded-lg mt-3 p-1">
      <div className="flex h-8">
        <div
          className={`flex-1 flex text-xs justify-center p-3 rounded-full cursor-pointer ${
            activeTab === "pending" ? "bg-white" : ""
          }`}
          onClick={() => handleTabChange("pending")}
        >
          <div className="flex text-xs items-center cursor-pointer">
            <Loader size={16} color="#b12e26" />
            <span className="ml-2">Pending</span>
          </div>
        </div>
        <div
          className={`flex-1 flex text-xs justify-center p-4 rounded-full cursor-pointer ${
            activeTab === "on-route" ? "bg-white" : ""
          }`}
          onClick={() => handleTabChange("on-route")}
        >
          <div className="flex items-center text-xs cursor-pointer">
            <Truck size={16} color="#b12e26" />
            <span className="ml-2">On Route</span>
          </div>
        </div>
        <div
          className={`flex-1 flex justify-center text-xs p-4 rounded-full cursor-pointer ${
            activeTab === "completed" ? "bg-white" : ""
          }`}
          onClick={() => handleTabChange("completed")}
        >
          <div className="flex items-center text-xs cursor-pointer">
            <CheckCircle size={16} color="#b12e26" />
            <span className="ml-2">Completed</span>
          </div>
        </div>
        <div
          className={`flex-1 flex justify-center p-4 rounded-full cursor-pointer ${
            activeTab === "cancelled" ? "bg-white" : ""
          }`}
          onClick={() => handleTabChange("cancelled")}
        >
          <div className="flex items-center cursor-pointer">
            <XCircle size={16} color="#b12e26" />
            <span className="ml-2">Cancelled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTabs;
