import { createSlice } from "@reduxjs/toolkit";

// Function to safely parse JSON from localStorage
const parseJSONFromLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(
      `Error parsing JSON from localStorage for key ${key}:`,
      error
    );
    return null;
  }
};

const initialState = {
  selectedBranch: parseJSONFromLocalStorage("selectedBranch"),
};

const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    setBranch: (state, action) => {
      state.selectedBranch = action.payload;
      try {
        localStorage.setItem("selectedBranch", JSON.stringify(action.payload));
      } catch (error) {
        console.error("Error saving selectedBranch to localStorage:", error);
      }
    },
  },
});

export const { setBranch } = branchSlice.actions;

export default branchSlice.reducer;
