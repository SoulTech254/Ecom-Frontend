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
import { useSelector } from "react-redux";
import DeliveryForm from "@/forms/DeliveryForm";

const AddressPage = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [updatedAddresses, setUpdatedAddresses] = useState([]);

  const userId = useSelector((state) => state.user.user._id);

  const { addresses, isAddressesLoading, refetchAddresses } =
    useGetAddresses(userId);

  const { createAddressRequest, isCreatingAddress } = useCreateAddress(userId);
  const { deleteAddressRequest, isDeletingAddress } = useDeleteAddress(userId);

  const handleSubmit = (data) => {
    const newData = {
      location: {
        coordinates: [-122.4194, 37.7749],
      },
      address: data.address,
      contactNumber: data.contactNumber,
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
      console.log(updatedAddresses);
      setUpdatedAddresses(updatedAddresses);
    });
  };

  return (
    <div className="mt-20">
      <Stepper
        steps={steps}
        activeStep={1}
        to={links}
        doneSteps={[0]}
        heading={"Checkout Process"}
      />
      <h1>Select Store and Delivery Information</h1>
      <div className="flex">
        <div className="w-1/2">
          {isAddressesLoading || isDeletingAddress || isCreatingAddress ? (
            <p>Loading...</p>
          ) : updatedAddresses?.length > 0 ? (
            updatedAddresses.map((addressData) => (
              <AddressCard
                key={addressData._id}
                address={addressData.address}
                onDeleteAddress={() => handleDeleteAddress(addressData._id)}
              />
            ))
          ) : (
            <p>No addresses found.</p>
          )}
        </div>
      </div>

      <Sheet>
        <SheetTrigger>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
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
    </div>
  );
};

export default AddressPage;
