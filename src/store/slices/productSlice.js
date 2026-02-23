import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeImageList = (images) => {
  if (!Array.isArray(images)) return [];
  return images
    .map((item) => (typeof item === "string" ? item : item?.url))
    .filter(Boolean);
};

const normalizeProduct = (product) => {
  if (!product) return null;
  const imageList = normalizeImageList(product.images);
  return {
    ...product,
    id: String(product.id),
    rating: toNumber(product.ratings ?? product.rating, 0),
    reviewsCount: toNumber(product.review_count ?? product.reviewsCount, 0),
    price: toNumber(product.price, 0),
    queryPhone: product.query_phone || product.queryPhone || "",
    whatsappPhone: product.whatsapp_phone || product.whatsappPhone || "",
    images: imageList,
    image: product.image || imageList[0] || "",
  };
};

const normalizeReviews = (reviews) => {
  if (!Array.isArray(reviews)) return [];
  return reviews.map((review) => ({
    id: review.review_id,
    rating: toNumber(review.rating, 0),
    comment: review.comment || "",
    user: review.reviewer?.name || "Anonymous User",
  }));
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (params = {}, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/product", { params });
      return {
        products: (response.data.products || []).map(normalizeProduct),
        totalProducts: toNumber(response.data.totalProducts, 0),
        newProducts: (response.data.newProducts || []).map(normalizeProduct),
        topRatedProducts: (response.data.topRatedProducts || []).map(
          normalizeProduct
        ),
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch products.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/product/singleProduct/${productId}`);
      const normalized = normalizeProduct(response.data.product);
      return {
        product: normalized,
        reviews: normalizeReviews(response.data.product?.reviews),
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch product details.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postReview = createAsyncThunk(
  "product/postReview",
  async ({ productId, rating, comment }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `/product/post-new/review/${productId}`,
        { rating, comment }
      );
      thunkAPI.dispatch(fetchProductDetails(productId));
      toast.success(response.data?.message || "Review posted.");
      return response.data?.review;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to post review.";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    products: [],
    productDetails: {},
    productError: null,
    totalProducts: 0,
    topRatedProducts: [],
    newProducts: [],
    aiSearching: false,
    isReviewDeleting: false,
    isPostingReview: false,
    productReviews: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.productError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
        state.newProducts = action.payload.newProducts;
        state.topRatedProducts = action.payload.topRatedProducts;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.productError = action.payload || "Failed to fetch products.";
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.productError = null;
        state.productReviews = [];
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        const product = action.payload.product;
        if (product) {
          state.productDetails = product;
          state.productReviews = action.payload.reviews;
          const idx = state.products.findIndex((item) => item.id === product.id);
          if (idx >= 0) {
            state.products[idx] = { ...state.products[idx], ...product };
          } else {
            state.products.unshift(product);
          }
        }
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.productError =
          action.payload || "Failed to fetch product details.";
      })
      .addCase(postReview.pending, (state) => {
        state.isPostingReview = true;
      })
      .addCase(postReview.fulfilled, (state) => {
        state.isPostingReview = false;
      })
      .addCase(postReview.rejected, (state, action) => {
        state.isPostingReview = false;
        state.productError = action.payload || "Failed to post review.";
      });
  },
});

export default productSlice.reducer;
