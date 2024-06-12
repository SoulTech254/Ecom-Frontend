import { isError, useMutation, useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetProducts = () => {
  const getProductsRequest = async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/products`, {
      method: "GET",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const { data: products, isLoading: isProductsLoading } = useQuery(
    "products",
    getProductsRequest
  );

  return { products, isProductsLoading };
};

export const useGetAProduct = (id) => {
  const getProductsRequest = async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/products/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const { data: product, isLoading: isProductLoading } = useQuery(
    ["product", id],
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
      body: JSON.stringify({ product: productId}),
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