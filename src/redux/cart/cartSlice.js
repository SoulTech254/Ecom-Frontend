import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const storage = localStorage.getItem("cartItems");

// Initial state
const initialState = {
  products: JSON.parse(storage) || [],
  totalQuantity: 0,
  totalAmount: 0,
  savings:0,
  status: "idle",
  error: null,
};
// Utility function to save cart to local storage
const saveCartToLocalStorage = (products) => {
  localStorage.setItem("cartItems", JSON.stringify(products));
};

// Async thunk for adding product to cart (authenticated users)
// Async thunk for adding product to cart (authenticated users)
export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async ({ productID, quantity }, { getState, rejectWithValue }) => {
    const user = getState().user.user;
    if (!user) {
      // User not authenticated, handle the error
      return rejectWithValue({ error: "User not authenticated" });
    }
    const { cart: id } = user;
    console.log(productID);

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/cart/${id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product: productID, quantity: quantity }),
      }
    );

    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to add product to cart");
    }

    const data = await response.json();
    console.log(data);
    return data;
  }
);

// Async thunk for merging local cart with backend cart
export const mergeLocalCart = createAsyncThunk(
  "cart/mergeLocalCart",
  async (_, { getState }) => {
    console.log("Starting mergeLocalCart async thunk");
    const user = getState().user.user;
    console.log("User:", user);
    const localCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    console.log("Local cart items:", localCartItems);

    // Create an array of objects with productId and quantity
    const cartItemsToMerge = localCartItems.map((item) => ({
      product: item.id,
      quantity: item.quantity,
    }));
    console.log("Cart items to merge:", cartItemsToMerge);

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/cart/merge/${user.cart}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItemsToMerge),
      }
    );

    console.log("Response:", response);

    if (!response.ok) {
      throw new Error("Failed to merge cart");
    }

    const data = await response.json();
    console.log("Data:", data);
    return data;
  }
);

export const deleteProductFromCart = createAsyncThunk(
  "cart/deleteProductFromCart",
  async ({ cartId, productId }, { getState, rejectWithValue }) => {
    const user = getState().user.user;
    if (!user) {
      // User not authenticated, handle the error
      return rejectWithValue({ error: "User not authenticated" });
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/cart/product/${cartId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product: productId }),
      }
    );

    console.log(productId);
    if (!response.ok) {
      throw new Error("Failed to delete product from cart");
    }

    const data = await response.json();
    console.log(data);
    return data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartLocal: (state, action) => {
      const item = action.payload;
      const existingItem = state.products.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.products.push({ ...item, quantity: 1 });
      }
      saveCartToLocalStorage(state.products);
      state.totalQuantity += 1;
      state.totalAmount += parseFloat(item.price);
      state.savings += parseFloat(item.savings);
    },
    clearLocalCart: (state) => {
      state.products = [];
      localStorage.removeItem("cartItems");
    },
    updateCartState: (state, action) => {
      state.products = action.payload.products;
      state.savings = action.payload.savings;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalAmount = action.payload.totalAmount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
        state.savings = action.payload.savings;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(mergeLocalCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(mergeLocalCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
        state.totalQuantity = state.products.reduce(
          (acc, curr) => acc + curr.quantity,
          0
        );
        state.savings = action.payload.savings;
        state.totalAmount = action.payload.totalAmount;
        localStorage.removeItem("cartItems");
      })
      .addCase(mergeLocalCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      .addCase(deleteProductFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(deleteProductFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addToCartLocal, clearLocalCart, updateCartState } =
  cartSlice.actions;
export default cartSlice.reducer;
