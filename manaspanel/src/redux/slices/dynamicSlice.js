import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance1 from "../../helper/axiosInstance";
import { toast } from "sonner";
import Cookies from "js-cookie";

const initialState = {
  loading: false,
  error: null,
  dynamicPage: [],
  sections: [],
  specificSection: [],
  inquiryList: [],
  vendorList: [],
  openModel: false,
  isAuthenticated: Cookies.get("isAuthenticated") === "true",
};

export const getAllPages = createAsyncThunk(
  "discounts/getCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.get(`/dynamic`);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch pages");
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSections = createAsyncThunk(
  "discounts/section",
  async (name, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.get(`/dynamic/${name}`);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch sections");
      return rejectWithValue(error.response.data);
    }
  }
);

export const addSections = createAsyncThunk(
  "discounts/add/section",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", data?.title);
      formData.append("description", data?.description);
      formData.append("photo", data?.photo);
      formData.append("page", data?.page);

      const response = await axiosInstance1.post(`/dynamic/section`, formData);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add Section");
      return rejectWithValue(error.response.data);
    }
  }
);

export const editSections = createAsyncThunk(
  "discounts/edit/section",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", data?.title);
      formData.append("description", data?.description);
      formData.append("photo", data?.photo);
      formData.append("page", data?.page);
      formData.append("oldTitle", data?.oldTitle);

      const response = await axiosInstance1.put(`/dynamic/section`, formData);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update Section");
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteSections = createAsyncThunk(
  "discounts/delete/section",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.delete(`/dynamic/section/${id}`);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete Section");
      return rejectWithValue(error.response.data);
    }
  }
);

export const getInquiry = createAsyncThunk(
  "discounts/inquiry",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.get(`/inquiry`);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch inquiries");
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteInquiry = createAsyncThunk(
  "discounts/delete/inquiry",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.delete(`/inquiry/${id}`);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete inquiry");
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAllInquiry = createAsyncThunk(
  "discounts/delete/all/inquiry",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.delete(`/inquiry/delete/all`);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete inquiries");
      return rejectWithValue(error.response.data);
    }
  }
);

export const addChild = createAsyncThunk(
  "discounts/section/child",
  async ({ data, child }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", data?.title);
      formData.append("description", data?.description);
      formData.append("photo", data?.photo);

      const response = await axiosInstance1.post(
        `/dynamic/child/${child}`,
        formData
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add child section");
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSpecificSection = createAsyncThunk(
  "discounts/specificSection",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.post(`/dynamic/get/section`, data);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch section");
      return rejectWithValue(error.response.data);
    }
  }
);

export const getVendor = createAsyncThunk(
  "discounts/vendor",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.get(`/vendor`);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch vendors");
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteVendor = createAsyncThunk(
  "discounts/delete/vendor",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.delete(`/vendor/${id}`);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete vendor");
      return rejectWithValue(error.response.data);
    }
  }
);

export const addVendor = createAsyncThunk(
  "discounts/add/vendor",
  async (vendorData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.post(`/vendor`, vendorData);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add vendor");
      return rejectWithValue(error.response.data);
    }
  }
);

export const handleLogin = createAsyncThunk(
  "discounts/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.post(`/login`, data);

      const loginTime = new Date().getTime();
      Cookies.set("isAuthenticated", "true", { expires: 20 / 1440 });
      Cookies.set("loginTimestamp", loginTime, { expires: 20 / 1440 });

      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed.");
      return rejectWithValue(error.response.data);
    }
  }
);

const dynamicSlice = createSlice({
  name: "dynamicList",
  initialState,
  reducers: {
    logoutManas: (state) => {
      state.isAuthenticated = false;
      state.vendorList = [];
      state.inquiryList = [];
      Cookies.remove("isAuthenticated");
      Cookies.remove("loginTimestamp");
      toast.success("Logged out successfully");
    },
    toggleModel: (state) => {
      state.openModel = !state.openModel;
    },
  },
  extraReducers: (builder) => {
    builder
      // ---- Pending ----
      .addCase(getAllPages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSpecificSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ---- Fulfilled ----
      .addCase(getAllPages.fulfilled, (state, action) => {
        state.loading = false;
        state.dynamicPage = action?.payload?.data;
      })
      .addCase(getSections.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action?.payload?.sections;
      })
      .addCase(getSpecificSection.fulfilled, (state, action) => {
        state.loading = false;
        state.specificSection = action?.payload?.section?.children;
      })
      .addCase(getInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiryList = action?.payload?.data;
      })
      .addCase(getVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorList = action?.payload?.data;
      })
      .addCase(handleLogin.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
        toast.success("Login successful!");
      })

      // ---- Rejected ----
      .addCase(getAllPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSpecificSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        toast.error("Login failed.");
      });
  },
});

export default dynamicSlice.reducer;
export const { logoutManas, toggleModel } = dynamicSlice.actions;