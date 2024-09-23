import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const handleError = (error) => {
  if (error.response) {
    const statusCode = error.response.status;
    const message = error.response.data?.message || "An error occurred";

    // Customize messages based on status codes or specific messages
    switch (statusCode) {
      case 400:
        return "Please check your input and try again.";
      case 401:
        return "Session has Expired. Please Login Again.";
      case 403:
        return "FORBIDDEN. You don't have permission to perform this action.";
      case 404:
        return "The address you are trying to access was not found.";
      case 500:
      default:
        return "Something went wrong on our end. Please try again later.";
    }
  }
  return "Network error. Please check your internet connection.";
};

export const useCreateAddress = (userId) => {
  const axiosPrivate = useAxiosPrivate();
  const createAddress = async (data) => {
    const response = await axiosPrivate.post(`/api/v1/addresses`, {
      address: data,
      userId: userId,
    });
    return response.data;
  };

  const { mutateAsync: createAddressRequest, isLoading: isCreatingAddress } =
    useMutation(createAddress, {
      onSuccess: () => {
        toast.success("Address created successfully!");
      },
      onError: (error) => {
        toast.error(handleError(error));
      },
    });

  return { createAddressRequest, isCreatingAddress };
};

export const useUpdateAddress = () => {
  const axiosPrivate = useAxiosPrivate();
  const updateAddress = async (data) => {
    const response = await axiosPrivate.put(`/api/v1/addresses`, data);
    return response.data;
  };

  const { mutateAsync: updateAddressRequest, isLoading: isUpdatingAddress } =
    useMutation(updateAddress, {
      onSuccess: () => {
        toast.success("Address updated successfully!");
      },
      onError: (error) => {
        toast.error(handleError(error));
      },
    });

  return { updateAddressRequest, isUpdatingAddress };
};

export const useGetAddress = (id) => {
  const axiosPrivate = useAxiosPrivate();
  const getAddress = async () => {
    const response = await axiosPrivate.get(`/api/v1/addresses/${id}`);
    return response.data;
  };

  const { data: address, isLoading: isAddressLoading } = useQuery({
    queryKey: ["address", id],
    queryFn: getAddress,
    enabled: !!id,
  });

  return { address, isAddressLoading };
};

export const useGetAddresses = (userId) => {
  const axiosPrivate = useAxiosPrivate();

  const getAddresses = async () => {
    const response = await axiosPrivate.get(`/api/v1/addresses/${userId}`);
    return response.data;
  };

  const {
    data: addresses,
    isLoading: isAddressesLoading,
    error,
  } = useQuery(["addresses", userId], getAddresses, {
    enabled: !!userId,
    cacheTime: 0,
    staleTime: 0,
  });

  if (error) {
    toast.error(handleError(error)); // Display error message for addresses fetch
    console.error("Error in useGetAddresses:", error);
  }

  return { addresses, isAddressesLoading };
};

export const useDeleteAddress = (userId) => {
  const axiosPrivate = useAxiosPrivate();
  const deleteAddress = async (id) => {
    const response = await axiosPrivate.delete(
      `/api/v1/addresses/${userId}/${id}`
    );
    return response.data;
  };

  const { mutateAsync: deleteAddressRequest, isLoading: isDeletingAddress } =
    useMutation(deleteAddress, {
      onSuccess: () => {
        toast.success("Address deleted successfully!");
      },
      onError: (error) => {
        toast.error(handleError(error));
      },
    });

  return { deleteAddressRequest, isDeletingAddress };
};
