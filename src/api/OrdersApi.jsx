import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const handleError = (error) => {
  if (error.response) {
    const statusCode = error.response.status;
    const message = error.response.data?.message || "An error occurred";

    switch (statusCode) {
      case 400:
        return "Invalid request. Please check your input.";
      case 404:
        return "No orders found for this user.";
      case 401:
        return "Session has Expired. Please Login Again.";
      case 403:
        return "FORBIDDEN. You don't have permission to perform this action.";
      case 500:
      default:
        return "Something went wrong on our end. Please try again later.";
    }
  }
  return "Network error. Please check your internet connection.";
};

export const useGetOrders = (userId, method) => {
  const axiosPrivate = useAxiosPrivate();

  const getOrdersRequest = async () => {
    try {
      const response = await axiosPrivate.get(`/api/v1/orders/user/orders`, {
        params: { userId, method },
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleError(error);
      toast.error(errorMessage); // Display toast with the error message
      throw new Error(errorMessage);
    }
  };

  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery(["orders", userId, method], getOrdersRequest, {
    enabled: !!userId, // Ensure the query runs only if userId is provided
  });

  return { orders, isLoading, refetch };
};
