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
  appointmentList: [],
  appointmentPagination: { total: 0, page: 1, limit: 10, totalPages: 1 },
  casesPagination: { total: 0, page: 1, limit: 6, totalPages: 1 },
  vendorList: [],
  openModel: false,
  isAuthenticated: Cookies.get("isAuthenticated") === "true",
};

export const getAllPages = createAsyncThunk(
  "discounts/getCategory",
  async (params = {}, { rejectWithValue }) => {
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
  async (arg, { rejectWithValue }) => {
    try {
      let pageName = arg;
      let params = {};
      if (typeof arg === "object" && arg !== null) {
        pageName = arg.name;
        params = arg.params || {};
      }
      const response = await axiosInstance1.get(`/dynamic/${pageName}`, { params });
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
  async (params = {}, { rejectWithValue }) => {
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
  async (params = {}, { rejectWithValue }) => {
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

export const getAppointments = createAsyncThunk(
  "discounts/getAppointments",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.get(`/appointement`, { params });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch callback requests");
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  "discounts/deleteAppointment",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.delete(`/appointement/${id}`);
      toast.success(response.data.message || "Appointment deleted successfully");
      return id;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to delete appointment");
      return rejectWithValue(error?.response?.data);
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
  async (params = {}, { rejectWithValue }) => {
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
      state.appointmentList = [];
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
      .addCase(getAppointments.pending, (state) => {
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
        state.sections = action?.payload?.sections || [];
        if (action?.payload?.pagination) {
          state.casesPagination = action.payload.pagination;
        }
      })
      .addCase(getSpecificSection.fulfilled, (state, action) => {
        state.loading = false;
        state.specificSection = action?.payload?.section?.children;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointmentList = action?.payload?.data || [];
        if (action?.payload?.pagination) {
          state.appointmentPagination = action.payload.pagination;
        }
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointmentList = (state.appointmentList || []).filter(
          (item) => item._id !== action.payload
        );
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
      .addCase(getAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
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