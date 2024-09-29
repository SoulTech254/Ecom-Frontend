import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const handleError = (error) => {
  if (error.response) {
    const statusCode = error.response.status;
    const message = error.response.data?.message || "An error occurred";

    switch (statusCode) {
      case 400:
        return "Please check your input and try again.";
      case 401:
        return "You are not authorized. Please log in.";
      case 403:
        return "FORBIDDEN. You don't have permission to perform this action.";
      case 404:
        return "Order not found.";
      case 500:
      default:
        return "Something went wrong on our end. Please try again later.";
    }
  }
  return "Network error. Please check your internet connection.";
};

export const useGetOrderSummary = () => {
  const axiosPrivate = useAxiosPrivate();

  const getOrderSummary = async (data) => {
    try {
      const response = await axiosPrivate.post(
        `/api/v1/checkout/initiate`,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(handleError(error));
    }
  };

  const { mutateAsync: getOrderSummaryData, isLoading: isLoadingOrderSummary } =
    useMutation(getOrderSummary, {
      onError: (error) => {
        toast.error(handleError(error));
      },
    });

  return { getOrderSummaryData, isLoadingOrderSummary };
};

export const usePlaceOrder = () => {
  const axiosPrivate = useAxiosPrivate();

  const placeOrderRequest = async (data) => {
    try {
      const response = await axiosPrivate.post(`/api/v1/payment/mpesa`, data);
      return response.data;
    } catch (error) {
      throw new Error(handleError(error));
    }
  };

  const { mutateAsync: placeOrder, isLoading: isLoadingPlaceOrder } =
    useMutation(placeOrderRequest, {
      onError: (error) => {
        toast.error(handleError(error));
      },
    });

  return { placeOrder, isLoadingPlaceOrder };
};

export const useCheckOrder = (orderId) => {
  const axiosPrivate = useAxiosPrivate();

  const checkOrderRequest = async () => {
    try {
      const response = await axiosPrivate.get(
        `/api/v1/checkout/payment/mpesa/processing/${orderId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(handleError(error));
    }
  };

  const {
    data: orderStatus,
    isLoading: isLoadingOrderStatus,
    error,
    refetch,
  } = useQuery(["checkOrder", orderId], checkOrderRequest, {
    enabled: !!orderId,
    cacheTime: 0,
  });

  if (error) {
    toast.error(handleError(error));
  }

  return { orderStatus, isLoadingOrderStatus, refetch };
};
