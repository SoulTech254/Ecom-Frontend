import { useQuery } from "react-query";
import axios from "./axios"; // Adjust the import path as necessary
import { toast } from "sonner";

const handleError = (error) => {
  if (error.response) {
    const statusCode = error.response.status;
    const message = error.response.data?.message || "An error occurred";

    switch (statusCode) {
      case 400:
        return "Invalid request. Please try again.";
      case 404:
        return "Requested resource not found.";
      case 401:
        return "You are not authorized. Please log in.";
      case 500:
      default:
        return "Something went wrong on our end. Please try again later.";
    }
  }
  return "Network error. Please check your internet connection.";
};

export const useGetBranches = () => {
  const getBranchesRequest = async () => {
    try {
      const response = await axios.get("/api/v1/branch/");
      return response.data;
    } catch (error) {
      throw new Error(handleError(error));
    }
  };

  const { data: branches, isLoading: isLoadingBranches } = useQuery(
    "branches",
    getBranchesRequest,
    {
      onError: (error) => {
        toast.error(handleError(error));
      },
    }
  );

  return { branches, isLoadingBranches };
};

export const useSearchProducts = (
  query,
  branchId,
  sortBy = "createdAt",
  sortOrder = -1,
  page = 1,
  limit = 10
) => {
  const searchProductRequest = async () => {
    const searchParams = new URLSearchParams({
      query,
      branchId,
      sortBy,
      sortOrder,
      page,
      limit,
    });

    console.log(
      `Fetching products with query: ${query}, branchId: ${branchId}, sortBy: ${sortBy}, sortOrder: ${sortOrder}, page: ${page}, limit: ${limit}`
    );

    try {
      const response = await axios.get(
        `/api/v1/search?${searchParams.toString()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(handleError(error));
    }
  };

  const { data, isLoading: isProductsLoading } = useQuery(
    ["SearchProducts", query, branchId, sortBy, sortOrder, page, limit],
    searchProductRequest,
    {
      enabled: !!query && !!branchId,
      onError: (error) => {
        toast.error(handleError(error));
      },
    }
  );

  const products = data?.products || [];
  const metadata = data?.metadata || {};

  return { products, metadata, isProductsLoading };
};

export const useGetCategoryProducts = (
  categoryId,
  branchId,
  sortBy = "createdAt",
  sortOrder = -1,
  page = 1,
  limit = 10,
  searchQuery = ""
) => {
  const fetchCategoryProducts = async () => {
    const searchParams = new URLSearchParams({
      branch: branchId,
      sortBy,
      sortOrder,
      page,
      limit,
      category: categoryId,
    });
    if (searchQuery) {
      searchParams.append("query", searchQuery);
    }

    console.log(
      `Fetching products for category: ${categoryId}, branchId: ${branchId}, sortBy: ${sortBy}, sortOrder: ${sortOrder}, page: ${page}, limit: ${limit}, searchQuery: ${searchQuery}`
    );

    try {
      const response = await axios.get(
        `/api/v1/category?${searchParams.toString()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(handleError(error));
    }
  };

  const { data, isLoading: isProductsLoading } = useQuery(
    [
      "CategoryProducts",
      categoryId,
      branchId,
      sortBy,
      sortOrder,
      page,
      limit,
      searchQuery,
    ],
    fetchCategoryProducts,
    {
      enabled: !!categoryId && !!branchId,
      onError: (error) => {
        toast.error(handleError(error));
      },
    }
  );

  const products = data?.products || [];
  const metadata = data?.metadata || {};

  return { products, metadata, isProductsLoading };
};

export const useGetSubcategories = (categoryId) => {
  const fetchSubcategories = async () => {
    try {
      const response = await axios.get("/api/v1/category/subcategory", {
        params: { category: categoryId },
      });
      return response.data;
    } catch (error) {
      throw new Error(handleError(error));
    }
  };

  const { data, isLoading: isSubcategoriesLoading } = useQuery(
    ["Subcategories", categoryId],
    fetchSubcategories,
    {
      onError: (error) => {
        toast.error(handleError(error));
      },
    }
  );

  return { subcategories: data, isSubcategoriesLoading };
};
