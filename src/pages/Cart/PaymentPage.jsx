import Stepper from "@/components/Stepper";
import { links, steps } from "@/config/cartConfig";
import { setPaymentInfo } from "@/redux/order/orderSlice";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const paymentInfo = {
      paymentMethod: paymentMethod,
      paymentAccount: data.phoneNumber,
    };
    dispatch(setPaymentInfo(paymentInfo));
    navigate("/checkout");
  };

  const handleMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="mt-12">
      <Stepper
        doneSteps={[0, 1]}
        steps={steps}
        activeStep={2}
        to={links}
        heading={"Checkout Process"}
      />
      <h2>Select Payment Method</h2>
      <div>
        <label>
          <input
            type="radio"
            value="mpesa"
            checked={paymentMethod === "mpesa"}
            onChange={handleMethodChange}
          />
          M-Pesa
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="credit_card"
            checked={paymentMethod === "credit_card"}
            onChange={handleMethodChange}
          />
          Credit Card
        </label>
      </div>

      {paymentMethod === "mpesa" && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Phone Number:
            <input
              type="text"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{9}$/,
                  message: "Please enter a valid phone number",
                },
              })}
            />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber.message}</p>
            )}
          </label>
          <button type="submit">Pay with M-Pesa</button>
        </form>
      )}

      {paymentMethod === "credit_card" && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Card Number:
            <input
              type="text"
              {...register("cardNumber", {
                required: "Card number is required",
              })}
            />
            {errors.cardNumber && (
              <p className="text-red-500">{errors.cardNumber.message}</p>
            )}
          </label>
          <label>
            Expiry Date:
            <input
              type="text"
              {...register("expiryDate", {
                required: "Expiry date is required",
              })}
            />
            {errors.expiryDate && (
              <p className="text-red-500">{errors.expiryDate.message}</p>
            )}
          </label>
          <label>
            CVV:
            <input
              type="text"
              {...register("cvv", {
                required: "CVV is required",
              })}
            />
            {errors.cvv && <p className="text-red-500">{errors.cvv.message}</p>}
          </label>
          <button type="submit">Pay with Credit Card</button>
        </form>
      )}
      <button onClick={() => handleProceedToCheckout()}>
        Proceed to confirmation
      </button>
    </div>
  );
};

export default PaymentPage;
