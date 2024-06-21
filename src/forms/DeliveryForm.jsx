import React from "react";
import { useForm } from "react-hook-form";

const DeliveryForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <div>
        <h1>Delivery Information</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <div>
              <h3 className="mb-1 text-black">Enter your Address</h3>
              <input
                type="text"
                id="address"
                placeholder="Enter your Address"
                className="w-full bg-[#D9D9D9] rounded-full px-4 py-2 focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-2">
            <div>
              <h3 className="mb-1 text-black">Building</h3>
              <input
                {...register("building")}
                type="text"
                id="building"
                placeholder="Building"
                className="w-full bg-[#D9D9D9] rounded-full px-4 py-2 focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-2">
            <div>
              <h3 className="mb-1 text-black">City</h3>
              <input
                {...register("city")}
                type="text"
                id="city"
                placeholder="City"
                className="w-full bg-[#D9D9D9] rounded-full px-4 py-2 focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-2">
            <div>
              <h3 className="mb-1 text-black">Apartment No./Office Name</h3>
              <input
                {...register("apartment")}
                type="text"
                id="apartment"
                placeholder="Apartment No./Office Name"
                className="w-full bg-[#D9D9D9] rounded-full px-4 py-2 focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-2">
            <div>
              <h3 className="mb-1 text-black">Contact Number</h3>
              <input
                {...register("contactNumber", {
                  required: "Contact Number is required",
                })}
                type="text"
                id="contactNumber"
                placeholder="Contact Number"
                className="w-full bg-[#D9D9D9] rounded-full px-4 py-2 focus:outline-none"
              />
            </div>
            {errors.contactNumber && <p>{errors.contactNumber.message}</p>}
          </div>

          <div className="mb-2">
            <div>
              <h3 className="mb-1 text-black">Delivery Instructions</h3>
              <textarea
                {...register("instructions")}
                id="instructions"
                placeholder="Delivery Instructions"
                className="w-full bg-[#D9D9D9] rounded-lg px-4 py-2 focus:outline-none"
              ></textarea>
            </div>
            {errors.instructions && <p>{errors.instructions.message}</p>}
          </div>

          <div className="mb-2">
            <div>
              <h3 className="mb-1 text-black">Address Type</h3>
              <div className="mb-4">
                <div className="flex items-center">
                  <label className="inline-flex items-center mr-4">
                    <input
                      {...register("addressType", {
                        required: "Address Type is required",
                      })}
                      type="radio"
                      value="home"
                      className="form-radio h-5 w-5 text-[#E61927]"
                    />
                    <span className="ml-2">Home</span>
                  </label>
                  <label className="inline-flex items-center mr-4">
                    <input
                      {...register("addressType", {
                        required: "Address Type is required",
                      })}
                      type="radio"
                      value="work"
                      className="form-radio h-5 w-5 text-[#E61927]"
                      style={{ color: "#E61927" }}
                    />
                    <span className="ml-2">Work</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      {...register("addressType", {
                        required: "Address Type is required",
                      })}
                      type="radio"
                      value="other"
                      className="form-radio h-5 w-5 text-[#E61927]"
                    />
                    <span className="ml-2">Other</span>
                  </label>
                </div>
                {errors.addressType && (
                  <p className="text-red-500">{errors.addressType.message}</p>
                )}
              </div>
            </div>
            {errors.addressType && <p>{errors.addressType.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-[#194A34] w-full hover:bg-[#194A3490] text-white py-2 px-4 rounded-full focus:outline-none"
          >
            Save Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryForm;
