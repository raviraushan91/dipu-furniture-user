import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";
import { toggleAuthPopup } from "./popupSlice";

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/register", data);
      toast.success(response.data.message);
      thunkAPI.dispatch(toggleAuthPopup());
      return response.data.user;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    if (response.data?.user?.role !== "User") {
      toast.error("User panel allows only mobile OTP user login.");
      return thunkAPI.rejectWithValue(
        "User panel allows only mobile OTP user login."
      );
    }
    toast.success(response.data.message);
    thunkAPI.dispatch(toggleAuthPopup());
    return response.data.user;
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Login failed. Please try again."
    );
    return thunkAPI.rejectWithValue(error.response?.data.message);
  }
});

export const sendMobileOtp = createAsyncThunk(
  "auth/sendMobileOtp",
  async ({ phone }, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/mobile/send-otp", {
        phone,
      });
      toast.success(response.data.message);
      if (response.data.otp) {
        toast.info(`Dev OTP: ${response.data.otp}`);
      }
      return { phone };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to send OTP. Please try again.";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const verifyMobileOtp = createAsyncThunk(
  "auth/verifyMobileOtp",
  async ({ phone, otp, name }, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/mobile/verify-otp", {
        phone,
        otp,
        name,
      });
      toast.success(response.data.message || "Login successful.");
      thunkAPI.dispatch(toggleAuthPopup());
      return response.data.user;
    } catch (error) {
      const message =
        error.response?.data?.message || "OTP verification failed.";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUser = createAsyncThunk("auth/getuser", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get("/auth/me");
    if (response.data?.user?.role !== "User") {
      return thunkAPI.rejectWithValue(
        "User panel allows only mobile OTP user login."
      );
    }
    return response.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data.message || "failed to get user."
    );
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axiosInstance.get("/auth/logout");
    return null;
  } catch (error) {
    toast.error(
      error.res?.data?.message || "Logout failed. Please try again."
    );
    return thunkAPI.rejectWithValue(
      error.res?.data.message || "failed to logout."
    );
  }
});

export const deleteAccount = createAsyncThunk(
  "auth/deleteaccount",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.delete("/auth/account/delete");
      toast.success(response.data.message || "Account deleted.");
      return null;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Account deletion failed. Please try again.";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const forgotpassword = createAsyncThunk(
  "auth/forgotpassword",
  async (email, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/auth/password/forgot?frontendUrl=http://localhost:5173",
        email
      );
      toast.success(response.data.message);

      return null;
    } catch (error) {
      toast.error(error.response?.data?.message);
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  }
);

export const resetpassword = createAsyncThunk(
  "auth/resetpassword",
  async ({ token, password, confirmPassword }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `/auth/password/reset/${token}`,
        { password, confirmPassword }
      );
      toast.success(response.data.message);

      return resetpassword.data.user;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Password reset failed. Please try again.";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatepassword",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/auth/password/update`, data);
      toast.success(response.data.message);
      return null;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Password update failed. Please try again.";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateprofile",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`/auth/profile/update`, data);
      toast.success(res.data.message);
      return res.data.user;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Profile update failed. Please try again.";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isSendingOtp: false,
    isVerifyingOtp: false,
    otpSentPhone: "",
    isUpdatingProfile: false,
    isUpdatingPassword: false,
    isRequestingForToken: false,
    isCheckingAuth: true,
  },
  reducers: {
    resetOtpFlow: (state) => {
      state.otpSentPhone = "";
      state.isSendingOtp = false;
      state.isVerifyingOtp = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isSigningUp = false;
        state.authUser = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.isSigningUp = false;
      })

      // login
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.authUser = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggingIn = false;
      })
      // send mobile otp
      .addCase(sendMobileOtp.pending, (state) => {
        state.isSendingOtp = true;
      })
      .addCase(sendMobileOtp.fulfilled, (state, action) => {
        state.isSendingOtp = false;
        state.otpSentPhone = action.payload.phone;
      })
      .addCase(sendMobileOtp.rejected, (state) => {
        state.isSendingOtp = false;
      })
      // verify mobile otp
      .addCase(verifyMobileOtp.pending, (state) => {
        state.isVerifyingOtp = true;
      })
      .addCase(verifyMobileOtp.fulfilled, (state, action) => {
        state.isVerifyingOtp = false;
        state.authUser = action.payload;
        state.otpSentPhone = "";
      })
      .addCase(verifyMobileOtp.rejected, (state) => {
        state.isVerifyingOtp = false;
      })

      // get user
      .addCase(getUser.pending, (state) => {
        state.isCheckingAuth = true;
        state.authUser = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.authUser = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.isCheckingAuth = false;
        state.authUser = null;
      })

      // logout
      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
        state.otpSentPhone = "";
      })
      // delete account
      .addCase(deleteAccount.fulfilled, (state) => {
        state.authUser = null;
        state.otpSentPhone = "";
      })

      // forgot password
      .addCase(forgotpassword.pending, (state) => {
        state.isRequestingForToken = true;
      })
      .addCase(forgotpassword.fulfilled, (state) => {
        state.isRequestingForToken = false;
      })
      .addCase(forgotpassword.rejected, (state) => {
        state.isRequestingForToken = false;
      })

      // reset password
      .addCase(resetpassword.pending, (state) => {
        state.isRequestingForToken = true;
      })
      .addCase(resetpassword.fulfilled, (state,action) => {
        state.isRequestingForToken = false;
        state.authUser = action.payload;
      })
      .addCase(resetpassword.rejected, (state) => {
        state.isRequestingForToken = false;
        state.authUser = null;
      })
      // update profile
      .addCase(updateProfile.pending, (state) => {
        state.isUpdatingProfile = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isUpdatingProfile = false;
        state.authUser = action.payload;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.isUpdatingProfile = false;
      })

      // update password
      .addCase(updatePassword.pending, (state) => {
        state.isUpdatingPassword = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isUpdatingPassword = false;
      })
      .addCase(updatePassword.rejected, (state) => {
        state.isUpdatingPassword = false;
      });
  },
});

export default authSlice.reducer;
export const { resetOtpFlow } = authSlice.actions;
