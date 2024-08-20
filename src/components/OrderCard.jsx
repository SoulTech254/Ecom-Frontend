import React, { useState } from "react";
import { Calendar, ChevronsUpDown, MapPin, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import ProductOrderCard from "./ProductOrderCard";

const OrderCard = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border bg-white px-6 mt-1 py-2">
      <div className="px-4 py-3 bg-white">
        <h4 className="text-sm font-semibold"> ID: {order.orderId}</h4>
        <div className="flex justify-between gap-1 w-full">
          <div className="flex items-center h-7 gap-2 w-fit py-2 bg-gray-100 rounded-full px-2">
            <Store color="#b12e26" size={14} />
            <p className="text-sm">{order.branch && order.branch.name}</p>
          </div>
          <div className="flex items-center h-7 gap-2 w-fit py-2 bg-gray-100 rounded-full px-2">
            <Calendar color="#b12e26" size={14} />
            <p className="text-sm">
              {new Date(order.delivery.deliverySlot).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center h-7 gap-2 w-fit py-2 bg-gray-100 rounded-full px-2">
            <MapPin size={14} color="#b12e26" />
            <p className="text-sm">
              {order.delivery.address.address.building},{" "}
              {order.delivery.address.address.city}
            </p>
          </div>
        </div>
      </div>
      {order.products.slice(0, 1).map((product, index) => (
        <ProductOrderCard product={product} key={index} />
      ))}
      <div className="">
        {order.products.length > 1 && (
          <Collapsible open={isOpen} className="mt-2">
            <CollapsibleTrigger asChild></CollapsibleTrigger>
            <CollapsibleContent>
              {order.products.slice(1).map((product, index) => (
                <ProductOrderCard product={product} key={index} />
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}

        <div className="flex justify-between mt-1 items-center">
          <div className="text-sm">
            Total Amount Ksh <span className="font-semibold">{order.totalAmount}</span>
          </div>
          <div>
            {order.products.length > 1 && (
              <button
                onClick={toggleOpen}
                variant="ghost"
                className="w-fit text-xs px-3 py-1 border border-[#194A34] hover:bg-[#194A34] hover:text-white text-[#194A34] rounded-full transition-all duration-300"
              >
                {isOpen ? "View Less" : "View More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
