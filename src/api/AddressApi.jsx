import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log(API_BASE_URL);
export const useCreateAddress = (userId) => {
  console.log(userId);
  const createAddress = async (data) => {
    const res = await fetch(`${API_BASE_URL}/api/v1/addresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: data, userId: userId }),
    });
    const result = await res.json();
    return result;
  };

  const { mutateAsync: createAddressRequest, isLoading: isCreatingAddress } =
    useMutation(createAddress, {
      onSuccess: () => {
        toast.success("Address created");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { createAddressRequest, isCreatingAddress };
};

export const useupdateAddress = () => {
  const updateAddress = async (data) => {
    const res = await fetch(`${API_BASE_URL}/api/v1/addresses`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  };

  const { mutateAsync: updateAddressRequest, isLoading: isUpdatingAddress } =
    useMutation(updateAddress, {
      onSuccess: () => {
        toast.success("Address updated");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { updateAddressRequest, isUpdatingAddress };
};

export const useGetAddress = () => {
  const getAddress = async (id) => {
    const res = await fetch(`${API_BASE_URL}/api/v1/addresses/${id}`);
    const result = await res.json();
    return result;
  };

  const { data: address, isLoading: isAddressLoading } = useQuery({
    queryKey: ["address"],
    queryFn: getAddress,
  });

  return { address, isAddressLoading };
};

export const useGetAddresses = (userId) => {
  console.log("Inside useGetAddresses, userId:", userId);
  const getAddresses = async () => {
    console.log("Fetching addresses for userId:", userId);
    const res = await fetch(`${API_BASE_URL}/api/v1/addresses/${userId}`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await res.json();
    console.log("Fetched addresses:", result);
    return result;
  };

  const {
    data: addresses,
    isLoading: isAddressesLoading,
    error,
  } = useQuery("addresses", getAddresses);

  if (error) {
    console.error("Error in useGetAddresses:", error);
  }

  console.log("Returning addresses:", addresses);
  console.log("isAddressesLoading:", isAddressesLoading);

  return { addresses, isAddressesLoading };
};

export const useDeleteAddress = (userId) => {
  console.log(userId)
  const deleteAddress = async (id) => {
    console.log("Deleting address with id:", id);
    const res = await fetch(`${API_BASE_URL}/api/v1/addresses/${userId}/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    console.log("Deleted address:", result);
    return result;
  };

  const { mutateAsync: deleteAddressRequest, isLoading: isDeletingAddress } =
    useMutation(deleteAddress, {
      onSuccess: () => {
        console.log("Address deleted successfully");
        toast.success("Address deleted");
      },
      onError: (error) => {
        console.error("Error deleting address:", error);
        toast.error(error.message);
      },
    });

  return { deleteAddressRequest, isDeletingAddress };
};
