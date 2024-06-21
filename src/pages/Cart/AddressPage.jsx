import React, { useState, useEffect } from "react";
import Stepper from "@/components/Stepper";
import { links, steps } from "@/config/cartConfig";
import AddressCard from "@/components/AddressCard";
import {
  useGetAddresses,
  useCreateAddress,
  useDeleteAddress,
} from "@/api/AddressApi";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
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
  const [selectedMethod, setSelectedMethod] = useState("normal");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null); // State to store selected address
  const { totalAmount } = useSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);

  const userId = useSelector((state) => state.user.user._id);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { addresses, isAddressesLoading, refetchAddresses } =
    useGetAddresses(userId);

  const { createAddressRequest, isCreatingAddress } = useCreateAddress(userId);
  const { deleteAddressRequest, isDeletingAddress } = useDeleteAddress(userId);

  const handleSubmit = (data) => {
    const newData = {
      location: {
        coordinates: [-122.4194, 37.7749],
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
    });
  };

  useEffect(() => {
    if (!isAddressesLoading) {
      setUpdatedAddresses(addresses || []);
      setSelectedDeliveryAddress(addresses[0]?.address); // Set the first address as selected on initial render
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
    setSelectedAddress(address);
    setSelectedDeliveryAddress(address.address); // Update selected address state
  };

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
  };

  const handleDeliverySubmit = () => {
    const deliveryInfo = {
      address: selectedAddress,
      method: selectedMethod,
      deliverySlot: selectedSlot?.datetime,
    };
    dispatch(setDeliveryInfo(deliveryInfo));
    navigate("/payment");
  };

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
  };

  return (
    <div className="flex mt-20 gap-2 items-center justify-between">
      <div className="w-full">
        <Stepper
          steps={steps}
          activeStep={1}
          to={links}
          doneSteps={[0]}
          heading={"Checkout Process"}
        />
        <DeliveryMethod onMethodChange={handleMethodChange} />
        <DeliverySlot onSelectSlot={handleSelectSlot} />
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <div className="bg-[#A0D8BF] flex gap-8 px-10 py-3 mt-2">
            <MapPinned color="#E61927" />
            <h1>Delivery Details</h1>
          </div>
          <div className="bg-white flex justify-between items-center p-4">
            <div className="">
              <h2 className="text-lg font-semibold">
                Specify Delivery Details
              </h2>
              {selectedDeliveryAddress ? (
                <>
                  <p className="capitalize text-gray-700">
                    {selectedDeliveryAddress.addressType}
                  </p>
                  <p className="capitalize text-gray-700">
                    {selectedDeliveryAddress.building},{" "}
                    {selectedDeliveryAddress.city}
                  </p>
                  <p>{selectedDeliveryAddress.contactNumber}</p>
                </>
              ) : (
                <p>No address selected</p>
              )}
            </div>
            <PopoverTrigger asChild>
              <button
                className="border border-5 border-[#194A34] text-[#194A34] rounded-full px-4 py-2 hover:bg-[#194A34] hover:text-white transition duration-300"
                onClick={() => setIsOpen(!isOpen)}
              >
                Add Details
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex">
                <div className="w-full">
                  <Sheet>
                    <SheetTrigger>
                      <button className="border border-5 bg-[#194A34] text-white rounded-full px-4 py-2">
                        Add New Delivery Address
                      </button>
                    </SheetTrigger>
                    <SheetContent
                      className="w-[100vw] p-8 md:w-fit h-full"
                      side={isSmallScreen ? "bottom" : "right"}
                    >
                      <SheetTitle>Add New Delivery Address</SheetTitle>
                      <SheetDescription>
                        <ScrollArea className="h-[90vh] w-full border-none rounded-md border">
                          <DeliveryForm onSubmit={handleSubmit} />
                        </ScrollArea>
                      </SheetDescription>
                    </SheetContent>
                  </Sheet>
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
                        onSelectAddress={() => handleSelectAddress(addressData)} // Pass entire address object
                      />
                    ))
                  ) : (
                    <p>No addresses found.</p>
                  )}
                </div>
              </div>
            </PopoverContent>
          </div>
        </Popover>

        <button type="button" onClick={handleDeliverySubmit}>
          Next
        </button>
      </div>
      <div className="">
        <OrderSummary subtotal={totalAmount} savings={10} />
      </div>
    </div>
  );
};

export default AddressPage;
