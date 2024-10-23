import { useQuery } from "react-query";
import axios from "./axios"; // Adjust the import path as necessary
import { toast } from "sonner";

export const useGetBranches = () => {
  const getBranchesRequest = async () => {
    try {
      const response = await axios.get("/api/v1/branch/");
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw new Error(error);
    }
  };

  const { data: branches, isLoading: isLoadingBranches } = useQuery(
    "branches",
    getBranchesRequest
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

    const response = await axios.get(
      `/api/v1/search?${searchParams.toString()}`
    );
    return response.data;
  };

  const {
    data,
    isLoading: isProductsLoading,
    error: queryError,
  } = useQuery(
    ["SearchProducts", query, branchId, sortBy, sortOrder, page, limit],
    searchProductRequest,
    {
      enabled: !!query && !!branchId && page > 0, // Ensure that page is valid
      keepPreviousData: true, // Keep previous data while fetching new data
    }
  );

  const products = data?.products || [];
  const metadata = data?.metadata || {};

  const error = queryError
    ? queryError.response?.data || "An error occurred"
    : null;

  return { products, metadata, isProductsLoading, error };
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

    const response = await axios.get(
      `/api/v1/category?${searchParams.toString()}`
    );
    return response.data;
  };

  const {
    data,
    isLoading: isProductsLoading,
    error: queryError,
  } = useQuery(
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
      cacheTime: 0, // Disable cache
      staleTime: 0,
    }
  );

  const products = data?.products || [];
  const metadata = data?.metadata || {};

  // Handle the error and provide a more useful error message
  const error = queryError
    ? queryError.response?.data ||
      "An error occurred while fetching category products."
    : null;

  return { products, metadata, isProductsLoading, error };
};

export const useGetSubcategories = (categoryId) => {
  const fetchSubcategories = async () => {
    try {
      const response = await axios.get("/api/v1/category/subcategory", {
        params: { category: categoryId },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, isLoading: isSubcategoriesLoading } = useQuery(
    ["Subcategories", categoryId],
    fetchSubcategories
  );

  return { subcategories: data, isSubcategoriesLoading };
};
