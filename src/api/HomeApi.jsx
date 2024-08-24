import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetBranches = () => {
  const getBranchesRequest = async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/branch/`);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  };

  const { data: branches, isLoading: isLoadingBranches } = useQuery(
    "branches",
    getBranchesRequest
  );

  console.log(branches);

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
    try {
      // Build the query string with the query, branchId, sortBy, sortOrder, page, and limit
      const searchParams = new URLSearchParams();
      searchParams.append("query", query);
      searchParams.append("branchId", branchId);
      searchParams.append("sortBy", sortBy);
      searchParams.append("sortOrder", sortOrder);
      searchParams.append("page", page);
      searchParams.append("limit", limit);

      console.log(
        `Fetching products with query ${query}, branchId ${branchId}, sortBy ${sortBy}, sortOrder ${sortOrder}, page ${page}, and limit ${limit}`
      );

      const response = await fetch(
        `${API_BASE_URL}/api/v1/search?${searchParams.toString()}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();

      console.log("Data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products");
      }

      return data; // Ensure data includes both products and metadata
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  const { data, isLoading: isProductsLoading } = useQuery(
    ["SearchProducts", query, branchId, sortBy, sortOrder, page, limit],
    searchProductRequest,
    {
      enabled: !!query && !!branchId, // Only run the query if both query and branchId are provided
    }
  );

  const products = data?.products || [];
  const metadata = data?.metadata || {}; // Assuming metadata includes pagination info

  console.log("Products data from useQuery:", products);
  console.log("Metadata from useQuery:", metadata);
  console.log("Is products loading:", isProductsLoading);

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
    try {
      console.log(
        categoryId,
        branchId,
        sortBy,
        sortOrder,
        page,
        limit,
        searchQuery
      );
      // Build the query string with the search parameters
      const searchParams = new URLSearchParams();
      searchParams.append("branch", branchId);
      searchParams.append("sortBy", sortBy);
      searchParams.append("sortOrder", sortOrder);
      searchParams.append("page", page);
      searchParams.append("limit", 10);
      searchParams.append("category", categoryId);
      if (searchQuery) {
        searchParams.append("query", searchQuery);
      }

      console.log(
        `Fetching products for category ${categoryId}, branchId ${branchId}, sortBy ${sortBy}, sortOrder ${sortOrder}, page ${page}, limit ${limit}, and searchQuery ${searchQuery}`
      );

      const response = await fetch(
        `${API_BASE_URL}/api/v1/category?${searchParams.toString()}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();

      console.log("Data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch category products");
      }

      return data; // Ensure data includes both products and metadata
    } catch (error) {
      console.error("Error fetching category products:", error);
      throw error;
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
      enabled: !!categoryId && !!branchId, // Only run the query if both categoryId and branchId are provided
    }
  );

  const products = data?.products || [];
  const metadata = data?.metadata || {}; // Assuming metadata includes pagination info

  console.log("Products data from useQuery:", products);
  console.log("Metadata from useQuery:", metadata);
  console.log("Is products loading:", isProductsLoading);

  return { products, metadata, isProductsLoading };
};

export const useGetSubcategories = (categoryId) => {
  const searchParams = new URLSearchParams();
  searchParams.append("category", categoryId);
  const fetchSubcategories = async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/category/subcategory?${searchParams.toString()}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch subcategories");
    }

    return data;
  };

  const { data, isLoading: isSubcategoriesLoading } = useQuery(
    ["Subcategories", categoryId],
    fetchSubcategories
  );

  return { subcategories: data, isSubcategoriesLoading };
};
