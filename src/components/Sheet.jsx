import React from "react";
import { cn } from "@/lib/utils"; // Utility function for classNames

const Sheet = ({ isOpen, onClose, children, className, ...props }) => {
  return (
    <>
      {/* Background Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose} // Close sheet on overlay click
      />

      {/* Sheet Content */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-80 bg-white shadow-lg transition-transform transform",
          isOpen ? "translate-x-0" : "translate-x-full", // Slide in/out effect
          "duration-300 z-50"
        )}
      >
        <button
          className="absolute right-3 z-50 top-3 text-gray-600 hover:text-gray-900 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="p-6 relative h-full">{children}</div>
      </div>
    </>
  );
};

export default Sheet;
