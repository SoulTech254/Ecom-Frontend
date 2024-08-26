import React, { useState, useEffect } from "react";
import Stepper from "@/components/Stepper";
import { links, steps } from "@/config/cartConfig";
import AddressCard from "@/components/AddressCard";
import {
  useGetAddresses,
  useCreateAddress,
  useDeleteAddress,
} from "@/api/AddressApi";
import CustomSheet from "@/components/CustomSheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import DeliveryForm from "@/forms/DeliveryForm";
import DeliveryMethod from "@/components/DeliveryMethod";
import { setDeliveryInfo } from "@/redux/order/orderSlice";
import { useNavigate } from "react-router-dom";
import DeliverySlot from "@/components/DeliverySlot";
import OrderSummary from "@/components/OrderSummary";
import { MapPinned } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const AddressPage = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [updatedAddresses, setUpdatedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  console.log(selectedAddress);
  const [selectedMethod, setSelectedMethod] = useState("normal");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { totalAmount } = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.user.user._id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { addresses, isAddressesLoading } = useGetAddresses(userId);
  const { createAddressRequest, isCreatingAddress } = useCreateAddress(userId);
  const { deleteAddressRequest, isDeletingAddress } = useDeleteAddress(userId);

  const handleSubmit = (data) => {
    const newData = {
      location: {
        type: "Point",
        coordinates: [data.longitude, data.latitude],
      },
      contactNumber: data.contactNumber,
      building: data.building,
      city: data.city,
      apartment: data.apartment,
      instructions: data.instructions,
      addressType: data.addressType,
    };
    createAddressRequest(newData).then((updatedAddresses) => {
      setUpdatedAddresses(updatedAddresses);
      setIsSheetOpen(false);
    });
  };

  useEffect(() => {
    if (!isAddressesLoading) {
      setUpdatedAddresses(addresses || []);
      setSelectedDeliveryAddress(addresses[0]?.address);
    }
  }, [isAddressesLoading, addresses]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDeleteAddress = async (addressId) => {
    await deleteAddressRequest(addressId).then((updatedAddresses) => {
      setUpdatedAddresses(updatedAddresses);
    });
  };

  const handleSelectAddress = (address) => {
    console.log(address);
    setSelectedAddress(address);
    setSelectedDeliveryAddress(address.address);
  };

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
  };

  const handleDeliverySubmit = () => {
    const deliveryInfo = {
      address: selectedAddress,
      method: selectedMethod,
      deliverySlot: selectedSlot,
    };
    dispatch(setDeliveryInfo(deliveryInfo));
    navigate("/payment");
  };

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
  };

  return (
    <div className="w-full mt-2">
      <Stepper
        steps={steps}
        activeStep={1}
        to={links}
        doneSteps={[0]}
        heading={"Checkout Process"}
      />
      <div className="flex mt-2 gap-2 items-center justify-between">
        <div className="w-full">
          <DeliveryMethod onMethodChange={handleMethodChange} />
          <DeliverySlot
            onSelectSlot={handleSelectSlot}
            method={selectedMethod}
          />
          <div className="">
            {/* Render delivery details for both "normal" and "express" methods */}
            {(selectedMethod === "normal" || selectedMethod === "express") && (
              <>
                <div className="bg-[#A0D8BF] flex gap-8 px-10 py-3 mt-2">
                  <MapPinned color="#E61927" />
                  <h1>Delivery Details</h1>
                </div>
                <div className="bg-white flex justify-between items-center p-4">
                  <h2>Specify Delivery Details</h2>
                  <div className="">
                    {selectedDeliveryAddress ? (
                      <>
                        <p className="capitalize text-gray-700">
                          {selectedDeliveryAddress.addressType}
                        </p>
                        <p className="capitalize text-gray-700">
                          {selectedDeliveryAddress.building},{" "}
                          {selectedDeliveryAddress.city}
                        </p>
                        <p>+254 {selectedDeliveryAddress.contactNumber}</p>
                      </>
                    ) : (
                      <p>No address selected</p>
                    )}
                  </div>
                  <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger asChild>
                      <button
                        className="border border-5 border-[#194A34] text-[#194A34] rounded-full px-4 py-2 hover:bg-[#194A34] hover:text-white transition duration-300"
                        onClick={() => setIsPopoverOpen(true)}
                      >
                        View Addresses
                      </button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="flex flex-col gap-4 p-4">
                        <div className="flex justify-between items-center">
                          <button
                            className="bg-[#194A34] text-white px-4 py-2 rounded-full"
                            onClick={() => {
                              setIsSheetOpen(true);
                              setIsPopoverOpen(false);
                            }}
                          >
                            Create New Address
                          </button>
                        </div>
                        {isAddressesLoading ||
                        isDeletingAddress ||
                        isCreatingAddress ? (
                          <p>Loading...</p>
                        ) : updatedAddresses?.length > 0 ? (
                          updatedAddresses.map((addressData) => (
                            <AddressCard
                              key={addressData._id}
                              address={addressData.address}
                              onDeleteAddress={() =>
                                handleDeleteAddress(addressData._id)
                              }
                              onSelectAddress={() =>
                                handleSelectAddress(addressData)
                              }
                            />
                          ))
                        ) : (
                          <p>No addresses found.</p>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                {selectedMethod === "express" && (
                  <p className="text-gray-700 mt-2">
                    Package leaves in 30 minutes after payment
                  </p>
                )}
              </>
            )}
          </div>

          <CustomSheet
            isOpen={isSheetOpen}
            onClose={() => setIsSheetOpen(false)}
          >
            <ScrollArea className="h-[90vh] w-full border-none rounded-md border">
              <DeliveryForm onSubmit={handleSubmit} />
            </ScrollArea>
          </CustomSheet>

          <div className="flex w-full justify-center mt-2">
            <button
              className="bg-[#194A34] text-white px-4 py-2 rounded-full"
              type="button"
              onClick={handleDeliverySubmit}
            >
              Continue
            </button>
          </div>
        </div>
        <div className="">
          <OrderSummary subtotal={totalAmount} savings={10} shippingFee={100} />
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
