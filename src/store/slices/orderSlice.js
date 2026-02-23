import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";
import { clearCart } from "./cartSlice";

export const fetchMyOrders = createAsyncThunk(
  "order/fetchMyOrders",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/order/orders/me");
      return response.data?.myOrders || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders."
      );
    }
  }
);

export const placeOrderRequest = createAsyncThunk(
  "order/placeOrderRequest",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const cart = state.cart?.cart || [];
      const shippingInfo = state.order?.shippingInfo;

      if (!cart.length) {
        return thunkAPI.rejectWithValue("Cart is empty.");
      }
      if (!shippingInfo) {
        return thunkAPI.rejectWithValue("Shipping info is missing.");
      }

      const orderedItems = cart.map((item) => ({
        product: {
          id: item.id,
          images: item.images || (item.image ? [item.image] : []),
        },
        quantity: item.quantity || 1,
      }));

      const payload = {
        ...shippingInfo,
        orderedItems,
      };

      const response = await axiosInstance.post("/order/new", payload);
      thunkAPI.dispatch(clearCart());
      thunkAPI.dispatch(clearShippingInfo());
      thunkAPI.dispatch(fetchMyOrders());
      toast.success(response.data?.message || "Order placed successfully.");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to place order.";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    myOrders: [],
    fetchingOrders: false,
    placingOrder: false,
    orderError: null,
    finalPrice: null,
    orderStep: 1,
    paymentIntent: "",
    shippingInfo: null,
  },
  reducers: {
    addOrder: (state, action) => {
      state.myOrders.unshift(action.payload);
    },
    setShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },
    clearShippingInfo: (state) => {
      state.shippingInfo = null;
    },
    clearOrders: (state) => {
      state.myOrders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.fetchingOrders = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.fetchingOrders = false;
        state.myOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state) => {
        state.fetchingOrders = false;
      })
      .addCase(placeOrderRequest.pending, (state) => {
        state.placingOrder = true;
        state.orderError = null;
      })
      .addCase(placeOrderRequest.fulfilled, (state) => {
        state.placingOrder = false;
      })
      .addCase(placeOrderRequest.rejected, (state, action) => {
        state.placingOrder = false;
        state.orderError = action.payload || "Failed to place order.";
      });
  },
});

export default orderSlice.reducer;
export const { addOrder, setShippingInfo, clearShippingInfo, clearOrders } =
  orderSlice.actions;
