import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useMutation, useQuery } from "react-query";
import axios from "./axios";
import { toast } from "sonner"; // Import the toast library

export const handleError = (error) => {
  if (error.response) {
    const statusCode = error.response.status;
    const message = error.response.data?.message || "An error occurred";

    switch (statusCode) {
      case 400:
        return "Invalid request. Please check your input.";
      case 401:
        return "Session has Expired. Please Login Again.";
      case 403:
        return "FORBIDDEN. You don't have permission to perform this action.";
      case 404:
        return "Requested resource not found.";
      case 500:
      default:
        return "Something went wrong on our end. Please try again later.";
    }
  }
  return "Network error. Please check your internet connection.";
};

export const useGetProducts = (branchName, brand, pageNumber = 1) => {
  const axiosPrivate = useAxiosPrivate();

  const getProductsRequest = async () => {
    try {
      const params = new URLSearchParams();
      params.append("branch", branchName);
      params.append("page", pageNumber); // Append the page number

      if (brand) {
        params.append("brand", brand);
      }

      const response = await axiosPrivate.get(
        `/api/v1/products?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleError(error);
      toast.error(errorMessage); // Display toast message
      throw new Error(errorMessage);
    }
  };

  const {
    data,
    isLoading: isProductsLoading,
    isFetching,
    error,
  } = useQuery(
    ["products", branchName, brand, pageNumber], // Include page number in cache key
    getProductsRequest,
    {
      keepPreviousData: true, // Allows keeping previous data while fetching next page
      enabled: !!branchName, // Only fetch when branchName is available
    }
  );

  const products = data?.products || [];
  const metadata = data?.metadata || {};

  return { products, metadata, isProductsLoading, isFetching, error };
};

export const useGetBestSellers = (branchId) => {
  const getBestSellersRequest = async () => {
    try {
      const response = await axios.get(`/api/v1/products?branchId=${branchId}`);
      return response.data;
    } catch (error) {
      const errorMessage = handleError(error);
      toast.error(errorMessage); // Display toast message
      throw new Error(errorMessage);
    }
  };

  const { data: bestSellers, isLoading } = useQuery(
    ["bestSellers", branchId],
    getBestSellersRequest,
    {
      onError: (error) => {
        const errorMessage = handleError(error);
        toast.error(errorMessage); // Display toast message
      },
    }
  );

  return { bestSellers, isLoading };
};

export const useGetAProduct = (id, branchName) => {
  const getProductRequest = async () => {
    try {
      const response = await axios.get(`/api/v1/products/${id}`, {
        params: { branchName },
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleError(error);
      toast.error(errorMessage); // Display toast message
      throw new Error(errorMessage);
    }
  };

  const { data: product, isLoading: isProductLoading } = useQuery(
    ["product", id, branchName],
    getProductRequest
  );

  return { product, isProductLoading };
};

export const useGetCart = (id) => {
  const axiosPrivate = useAxiosPrivate();
  const getCartRequest = async () => {
    try {
      const response = await axiosPrivate.get(`/api/v1/cart/${id}`);
      return response.data;
    } catch (error) {
      const errorMessage = handleError(error);
      toast.error(errorMessage); // Display toast message
      throw new Error(errorMessage);
    }
  };

  const { data: cart, isLoading: isCartLoading } = useQuery(
    "cart",
    getCartRequest
  );

  return { cart, isCartLoading };
};

export const useUpdateCart = () => {
  const axiosPrivate = useAxiosPrivate();
  const updateCartRequest = async (id, productId, quantity) => {
    try {
      const response = await axiosPrivate.post(`/api/v1/cart/${id}/`, {
        product: productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleError(error);
      toast.error(errorMessage); // Display toast message
      throw new Error(errorMessage);
    }
  };

  const { mutateAsync: updateCart, isLoading: isCartLoading } =
    useMutation(updateCartRequest);

  return { updateCart, isCartLoading };
};

export const useDeleteCartProduct = () => {
  const axiosPrivate = useAxiosPrivate();
  const deleteProductRequest = async (id, productId) => {
    try {
      const response = await axiosPrivate.delete(`/api/v1/cart/product/${id}`, {
        data: { product: productId },
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleError(error);
      toast.error(errorMessage); // Display toast message
      throw new Error(errorMessage);
    }
  };

  const { mutateAsync: deleteProduct, isLoading: isDeleting } =
    useMutation(deleteProductRequest);

  return { deleteProduct, isDeleting };
};
