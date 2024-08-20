import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetOrders = (userId, status) => {
  const getOrdersRequest = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/orders/user/orders?userId=${userId}&status=${status}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery("orders", getOrdersRequest);

  return { orders, isLoading, refetch };
};
