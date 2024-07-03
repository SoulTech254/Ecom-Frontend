// orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartInfo: [],
  deliveryInfo: {},
  paymentInfo: {},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setDeliveryInfo(state, action) {
      state.deliveryInfo = action.payload;
    },
    setPaymentInfo(state, action) {
      state.paymentInfo = action.payload;
    },
    setCartInfo(state, action) {
      state.cartInfo = action.payload;
    },
    // You can add more reducers here based on your application's needs
  },
});

export const { setDeliveryInfo, setPaymentInfo } = orderSlice.actions;
export default orderSlice.reducer;
