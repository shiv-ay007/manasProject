import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance1 from "../../helper/axiosInstance";
import { toast } from "sonner";
import Cookies from 'js-cookie';

const initialState = {
  loading: false,
  error: null,
  dynamicPage: [],
  sections: [],
  specificSection: [],
  inquiryList: [],
  vendorList:[],
  openModel: false,
  isAuthenticated: Cookies.get('isAuthenticated') === 'true'
};

export const getAllPages = createAsyncThunk(
  "discounts/getCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.get(`/dynamic`);
      console.log(response);

      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add discount");
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSections = createAsyncThunk(
  "discounts/section",
  async (name, { rejectWithValue }) => {
    try {
      console.log(name);

      const response = await axiosInstance1.get(`/dynamic/${name}`);
      console.log(response);

      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add discount");
      return rejectWithValue(error.response.data);
    }
  }
);

export const modelOpen = createAsyncThunk(
  "discounts/section",
  async (_, { rejectWithValue }) => {
    console.log("model open called");
    console.log(openModel);
    openModel = !openModel;
    console.log(openModel);
  }
);

export const addSections = createAsyncThunk(
  "discounts/section",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);

      const formData = new FormData();

      formData.append("title", data?.title);
      formData.append("description", data?.description);
      formData.append("photo", data?.photo);
      formData.append("page", data?.page);

      const response = await axiosInstance1.post(`/dynamic/section`, formData);
      console.log(response);

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
      toast.error(error?.response?.data?.message || "Failed to add Section");
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteSections = createAsyncThunk(
  "discounts/delete/section",
  async (id, { rejectWithValue }) => {
    try {

    
      console.log(id);
      
      const response = await axiosInstance1.delete(`/dynamic/section/${id}`);
      console.log(response);

      // toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add Section");
      return rejectWithValue(error.response.data);
    }
  }
);







export const getInquiry = createAsyncThunk(
  "discounts/inquiry",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.get(`/inquiry`);
      console.log(response);

      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add Section");
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteInquiry = createAsyncThunk(
  "discounts/inquiry",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.delete(`/inquiry/${id}`);
      console.log(response);

      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add Section");
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAllInquiry = createAsyncThunk(
  "discounts/All/Inquiry",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.delete(`/inquiry/delete/all`);
      console.log(response);

      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add Section");
      return rejectWithValue(error.response.data);
    }
  }
);

export const addChild = createAsyncThunk(
  "discounts/section/chid",
  async ({ data, child }, { rejectWithValue }) => {
    try {
      console.log(data);
      console.log(child);

      const formData = new FormData();
      formData.append("title", data?.title);
      formData.append("description", data?.description);
      formData.append("photo", data?.photo);

      const response = await axiosInstance1.post(
        `/dynamic/child/${child}`,
        formData
      );
      console.log(response);

      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add Section");
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSpecificSection = createAsyncThunk(
  "discounts/specificSection",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);

      const response = await axiosInstance1.post(`/dynamic/get/section`, data);
      console.log(response);

      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add discount");
      return rejectWithValue(error.response.data);
    }
  }
);


export const getVendor = createAsyncThunk(
  "discounts/vendor",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.get(`/vendor`);
      console.log(response);

      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to Get Vendor");
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteVendor = createAsyncThunk(
  "discounts/vendor",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.delete(`/vendor/${id}`);
      console.log(response);

      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add Section");
      return rejectWithValue(error.response.data);
    }
  }
);

export const addVendor = createAsyncThunk(
  "discounts/section",
  async (vendorData, { rejectWithValue }) => {
    try {

      const response = await axiosInstance1.post(`/vendor`, vendorData);
      console.log(response);

      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add Section");
      return rejectWithValue(error.response.data);
    }
  }
);



export const handleLogin = createAsyncThunk(
  "discounts/section/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.post(`/login`, data);
      console.log(response);

      // On successful login, store the timestamp and isAuthenticated flag in cookies
      const loginTime = new Date().getTime(); // Current timestamp (in milliseconds)
      const expirationTime = 20 * 60 * 1000; // 20 minutes in milliseconds

      // Store in cookies with 20 minutes expiry
      Cookies.set('isAuthenticated', 'true', { expires: 20 / 1440 });
      Cookies.set('loginTimestamp', loginTime, { expires: 20 / 1440 });

      // Return the response data (could include user info, token, etc.)
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed.");
      return rejectWithValue(error.response.data);
    }
  }
);

// Add logout action
// export const  logoutManas = createSlice({
//   name: "dynamicList",
//   initialState,
//   reducers: {
//     logoutUser: (state) => {
//       state.isAuthenticated = false;
//       state.vendorList = [];
//       state.inquiryList = [];
//       Cookies.remove('isAuthenticated');
//       Cookies.remove('loginTimestamp');
//     },
//   },
// });





const dynamicSlice = createSlice({
  name: "dynamicList",
  initialState,
  reducers: {},
  reducers: {
    // Define the logout function here
    logoutManas: (state) => {
      state.isAuthenticated = false;
      state.vendorList = [];
      state.inquiryList = [];
      Cookies.remove('isAuthenticated');
      Cookies.remove('loginTimestamp');
      toast.success("Logged out successfully");
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(getAllPages.fulfilled, (state, action) => {
        state.loading = false;
        state.dynamicPage = action?.payload?.data;
      })
      .addCase(getSections.fulfilled, (state, action) => {
        console.log(action);

        state.loading = false;
        state.sections = action?.payload?.sections;
      })
      .addCase(handleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.loading = false;
        // Set isAuthenticated to true after a successful login
        state.isAuthenticated = true;
        toast.success("Login successful!");

        console.log("handle login is fulfilled or not");
        
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false; // Ensure it's false on failure
        toast.error("Login failed.");
      })
      .addCase(getSpecificSection.fulfilled, (state, action) => {
        console.log(action);

        state.loading = false;
        state.specificSection = action?.payload?.section?.children;
        console.log(state.specificSection);
      })
      .addCase(getInquiry.fulfilled, (state, action) => {
        console.log(action);

        state.loading = false;
        state.inquiryList = action?.payload?.data;
      })
      .addCase(getVendor.fulfilled, (state, action) => {
        console.log(action);

        state.loading = false;
        state.vendorList = action?.payload?.data;
        console.log(state.vendorList);
        
      })
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
      });
  },
});

export default dynamicSlice.reducer;
export const { logoutManas } = dynamicSlice.actions; // Export the logout action for use in components