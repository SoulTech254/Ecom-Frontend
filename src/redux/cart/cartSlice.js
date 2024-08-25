import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const storage = localStorage.getItem("cartItems");

// Initial state
const initialState = {
  products: JSON.parse(storage) || [],
  totalQuantity: 0,
  totalAmount: 0,
  savings: 0,
  status: "idle",
  error: null,
};

// Utility function to save cart to local storage
const saveCartToLocalStorage = (products) => {
  localStorage.setItem("cartItems", JSON.stringify(products));
};

// Async thunk for adding product to cart (authenticated users)
export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async ({ productID, quantity, method }, { getState, rejectWithValue }) => {
    const user = getState().user.user;

    if (!user) {
      return rejectWithValue({ error: "User not authenticated" });
    }

    const { cart: id } = user;

    const requestBody = {
      product: productID,
      quantity: quantity,
      method: method,
    };

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/cart/${id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({
        error: errorData.message || "Failed to add product to cart",
      });
    }

    const data = await response.json();
    return data;
  }
);

// Async thunk for merging local cart with backend cart
export const mergeLocalCart = createAsyncThunk(
  "cart/mergeLocalCart",
  async (_, { getState }) => {
    const user = getState().user.user;
    const localCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const cartItemsToMerge = localCartItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

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

    if (!response.ok) {
      throw new Error("Failed to merge cart");
    }

    const data = await response.json();
    return data;
  }
);

export const deleteProductFromCart = createAsyncThunk(
  "cart/deleteProductFromCart",
  async ({ cartId, productId }, { getState, rejectWithValue }) => {
    const user = getState().user.user;
    if (!user) {
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

    if (!response.ok) {
      throw new Error("Failed to delete product from cart");
    }

    const data = await response.json();
    return data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartLocal: (state, action) => {
      const { id, img, price, name, discountPrice, quantity } = action.payload;

      console.log("Add to cart local", {
        id,
        img,
        price,
        name,
        discountPrice,
        quantity,
      });

      const existingItem = state.products.find(
        (cartItem) => cartItem.product._id === id
      );

      if (existingItem) {
        existingItem.quantity += quantity;

        // Update savings if the quantity is updated
        existingItem.savings =
          (parseFloat(existingItem.product.price) - parseFloat(discountPrice)) *
          existingItem.quantity;

        if (existingItem.quantity <= 0) {
          state.products = state.products.filter(
            (cartItem) => cartItem.product._id !== id
          );
        }
      } else if (quantity > 0) {
        state.products.push({
          product: {
            _id: id,
            img: img,
            discountPrice: discountPrice,
            price: price,
            name: name,
          },
          quantity: quantity,
          savings: (parseFloat(price) - parseFloat(discountPrice)) * quantity,
        });
      }

      // Recalculate total quantity, amount, and savings
      state.totalQuantity = state.products.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      state.totalAmount = state.products.reduce(
        (acc, item) => acc + item.quantity * parseFloat(item.product.price),
        0
      );
      state.totalSavings = state.products.reduce(
        (acc, item) => acc + item.savings,
        0
      );

      saveCartToLocalStorage(state);
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
