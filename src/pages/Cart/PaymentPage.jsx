import OrderSummary from "@/components/OrderSummary";
import Stepper from "@/components/Stepper";
import { links, steps } from "@/config/cartConfig";
import { setPaymentInfo } from "@/redux/order/orderSlice";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import airtel from "../../assets/airtel.jpg";
import mpesa from "../../assets/mpesa.png";
import mastercard from "../../assets/mastercard.jpg";
import visa from "../../assets/Visa.jpg";
import CardDetailsForm from "@/forms/CardDetailsForm";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cardholderName, setCardholderName] = useState("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { totalAmount } = useSelector((state) => state.cart);

  const onSubmit = (data) => {
    const paymentInfo = {
      paymentMethod: paymentMethod,
      paymentAccount:
        paymentMethod === "mpesa" ? data.phoneNumber : data.cardNumber,
      cardholderName: cardholderName, // Add cardholderName to paymentInfo
    };
    dispatch(setPaymentInfo(paymentInfo));
    navigate("/checkout");
  };

  const handleMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCardholderNameChange = (e) => {
    setCardholderName(e.target.value);
  };

  const handleProceedToCheckout = () => {
    // Function to proceed to checkout if needed
  };

  return (
    <div className="mt-2">
      <Stepper
        doneSteps={[0, 1]}
        steps={steps}
        activeStep={2}
        to={links}
        heading={"Checkout Process"}
      />

      <div className="flex gap-8 justify-center">
        <div className="mt-2">
          <div className="flex flex-col">
            <div className="bg-white mt-1 w-fit px-40 py-4 rounded-lg">
              <h2 className="text-xl font-bold mb-3">Select Payment Method</h2>
              <p className="mb-2">
                Please select your preferred payment method.
              </p>
              <div className="flex gap-6">
                <input
                  type="radio"
                  value="mpesa"
                  checked={paymentMethod === "mpesa"}
                  onChange={handleMethodChange}
                />
                <img src={mpesa} className="w-20 h-10" alt="M-Pesa" />
              </div>
              <p>Mpesa</p>
              <div className="flex gap-6">
                <input
                  type="radio"
                  value="credit_card"
                  checked={paymentMethod === "credit_card"}
                  onChange={handleMethodChange}
                />

                <div className="flex">
                  <img src={visa} className="w-20 h-10" alt="Visa" />
                  <img
                    src={mastercard}
                    className="w-20 h-10"
                    alt="Mastercard"
                  />
                </div>
              </div>
              <p>Credit/Debit Card</p>
            </div>
          </div>
          {paymentMethod && (
            <div className="">
              {paymentMethod === "mpesa" && (
                <div className="rounded-lg bg-white mt-2 w-fit px-48 py-4">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="text-lg font-semibold mb-2">
                      Enter Phone Number
                    </h3>
                    <div className="flex">
                      <span
                        className={`w-[80px] mr-2 border-b outline-none focus:outline-none ${
                          errors.phoneNumber
                            ? "border-[#E71926]"
                            : "border-[#194A3491]"
                        }`}
                      >
                        +254
                      </span>
                      <input
                        {...register("phoneNumber")}
                        type="number"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        className={`w-full border-b pb-2 outline-none focus:outline-none ${
                          errors.phoneNumber
                            ? "border-[#E71926]"
                            : "border-[#194A3491]"
                        }`}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-[#E71926]">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="bg-[#194A34] text-white px-4 py-2 rounded-full mt-2"
                      >
                        Continue
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {paymentMethod === "credit_card" && (
                <div className="bg-white rounded-lg mt-2 w-fit px-40 py-4">
                  <CardDetailsForm onSave={onSubmit} />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="mt-2">
          <OrderSummary subtotal={totalAmount} savings={10} />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
