import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetBranches = () => {
  const getBranchesRequest = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/branch/`
    );
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
