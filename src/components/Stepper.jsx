import React from "react";
import { Check } from "lucide-react"; // Importing the tick icon from Lucide
import { Link } from "react-router-dom";

const Stepper = ({ heading, steps, activeStep, doneSteps, to }) => {
  return (
    <div>
      <ol className="flex items-center w-[80vw] justify-around p-3 space-x-10 text-base font-semibold text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-lg dark:bg-gray-800 dark:border-gray-700 sm:p-5 sm:space-x-6 rtl:space-x-reverse">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`flex items-center ${
              activeStep === index ? "font-bold" : ""
            }`}
          >
            <Link to={to[index]}>
              <span
                className={`flex items-center justify-center w-6 h-6 me-2 text-lg border border-gray-500 rounded-full shrink-0 dark:border-gray-400 ${
                  doneSteps && doneSteps.includes(index)
                    ? "bg-[#194A34] text-white font-bold"
                    : activeStep === index
                    ? "bg-transparent"
                    : "bg-gray-200" // Background color for not active step
                }`}
              >
                {/* Displaying tick icon if the step is marked as done */}
                {doneSteps && doneSteps.includes(index) ? (
                  <Check size={20} color="#ffffff" />
                ) : (
                  index + 1
                )}
              </span>
            </Link>
            <Link to={to[index]}>
              <span
                className={`${
                  doneSteps && doneSteps.includes(index) ? "text-[#194A34]" : ""
                }`}
              >
                {step.label}
              </span>
            </Link>
            {index < steps.length - 1 && (
              <svg
                className="w-4 h-4 ms-2 sm:ms-4 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 12 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m7 9 4-4-4-4M1 9l4-4-4-4"
                />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Stepper;
