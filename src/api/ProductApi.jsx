import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
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

export const useGetProducts = (branchName, brand) => {
  const axiosPrivate = useAxiosPrivate();

  const getProductsRequest = async ({ pageParam = 1 }) => {
    try {
      const params = new URLSearchParams();
      params.append("branch", branchName);
      params.append("page", pageParam); // Use pageParam for pagination

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
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isProductsLoading,
    error,
  } = useInfiniteQuery(
    ["products", branchName, brand], // Include branchName and brand in cache key
    getProductsRequest,
    {
      getNextPageParam: (lastPage, allPages) => {
        const totalPages = Math.ceil(
          lastPage.metadata.totalDocuments / lastPage.metadata.limit
        );
        const nextPage = allPages.length + 1; // Determine next page number
        return nextPage <= totalPages ? nextPage : undefined; // Return next page if it exists
      },
      enabled: !!branchName, // Only fetch when branchName is available
      keepPreviousData: true, // Keep previous data while fetching new data
    }
  );

  const products = data?.pages.flatMap((page) => page.products) || []; // Flatten products from all pages
  const metadata = data?.pages[0]?.metadata || {}; // Access metadata from the first page

  return {
    products,
    metadata,
    isProductsLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  };
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
