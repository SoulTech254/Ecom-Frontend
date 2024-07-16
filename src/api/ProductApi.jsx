import { isError, useMutation, useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetProducts = (branchId) => {
  const getProductsRequest = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/products?branchId=${branchId}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log("Products data:", data);
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  const { data: products, isLoading: isProductsLoading } = useQuery(
    ["productss", branchId],
    getProductsRequest,
    {
      enabled: !!branchId, // Only run the query if branchId is provided
    }
  );

  console.log("Products data from useQuery:", products);
  console.log("Is products loading:", isProductsLoading);

  return { products, isProductsLoading };
};

export const useGetAProduct = (id, branchName) => {
  const getProductsRequest = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/products/${id}?branchName=${branchName}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const { data: product, isLoading: isProductLoading } = useQuery(
    ["product", id, branchName],
    getProductsRequest
  );

  return { product, isProductLoading };
};

export const useGetCart = (id) => {
  const getCartRequest = async () => {
    console.log(id);
    const response = await fetch(`${API_BASE_URL}/api/v1/cart/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    console.log(data);
    return data;
  };

  const { data: cart, isLoading: isCartLoading } = useQuery(
    "cart",
    getCartRequest
  );

  return { cart, isCartLoading };
};

export const useUpdateCart = async (id, productId, quantity) => {
  const updateCartRequest = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/cart/${id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product: productId, quantity: quantity }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const {
    data: cart,
    isLoading: isCartLoading,
    isSuccess,
    error,
  } = useMutation(updateCartRequest);

  return { cart, isCartLoading, isSuccess, error };
};

export const useDeleteCartProduct = () => {
  const deleteProductRequest = async (id, productId) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/cart/product/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ product: productId }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  };
  const { mutateAsync: deleteProduct, isLoading: isDeleting } =
    useMutation(deleteProductRequest);

  return { deleteProduct, isDeleting };
};
