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
          <div>
            <input
              {...register("address", { required: "Address is required" })}
              type="text"
              id="address"
              placeholder="Delivery Address"
            />
          </div>
          {errors.address && <p>{errors.address.message}</p>}

          <div>
            <input
              {...register("contactNumber", {
                required: "Contact Number is required",
              })}
              type="text"
              id="contactNumber"
              placeholder="Contact Number"
            />
          </div>
          {errors.contactNumber && <p>{errors.contactNumber.message}</p>}

          <textarea
            {...register("instructions")}
            id="instructions"
            placeholder="Delivery Instructions"
          ></textarea>
          {errors.instructions && <p>{errors.instructions.message}</p>}

          <div>
            <label>
              <input
                {...register("addressType", {
                  required: "Address Type is required",
                })}
                type="radio"
                value="home"
              />
              Home
            </label>
            <label>
              <input
                {...register("addressType", {
                  required: "Address Type is required",
                })}
                type="radio"
                value="work"
              />
              Work
            </label>
            <label>
              <input
                {...register("addressType", {
                  required: "Address Type is required",
                })}
                type="radio"
                value="other"
              />
              Other
            </label>
          </div>
          {errors.addressType && <p>{errors.addressType.message}</p>}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryForm;
