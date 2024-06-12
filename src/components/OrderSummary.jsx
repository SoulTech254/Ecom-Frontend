import airtel from "../assets/airtel.jpg";
import mpesa from "../assets/mpesa.png";
import mastercard from "../assets/mastercard.jpg";
import visa from "../assets/Visa.jpg";

const OrderSummary = ({ subtotal, savings, shippingFee }) => {
  return (
    <div className=" bg-white p-8 w-[400px] border rounded-lg">
      <h2 className="font-bold mb-4 text-2xl">Order Summary</h2>
      <div className="flex justify-between mb-2">
        <span className="text-left">Subtotal</span>
        <span className="text-right">Ksh {subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-left">Savings</span>
        <span className="text-right">Ksh {savings.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-left">Shipping</span>
        <span className="text-right">Ksh {shippingFee.toFixed(2)}</span>
      </div>
      <div className="border-y border-gray-300 py-4 flex justify-between font-semibold">
        <span>Total (VAT Inc.)</span>
        <span>Ksh {(subtotal - savings + shippingFee).toFixed(2)}</span>
      </div>
      <button className="transition-colors duration-200 hover:bg-[#1F4F38] w-full bg-[#194A34] text-white py-2 px-4 rounded mt-4">
        PROCEED TO CHECKOUT
      </button>

      <div className="mt-8">
        <h3 className="font-bold mb-4 text-lg">Supported Payment Methods</h3>
        <div className="flex justify-around">
          <img src={airtel} alt="Airtel" className="h-10 w-auto" />
          <img src={mpesa} alt="Mpesa" className="h-10 w-auto" />
          <img src={mastercard} alt="Mastercard" className="h-10 w-auto" />
          <img src={visa} alt="Visa" className="h-10 w-auto" />
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;