import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance1 from "../../helper/axiosInstace";
// import { toast } from "sonner";

const initialState = {
  loading: false,
  error: null,
  dynamicPage: [],
  sections: [],
  cases: [],
  specificSection: [],
  inquiryList: [],
  vendorList:[],
  openModel: false,
};

export const getAllPages = createAsyncThunk(
  "discounts/getCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.get(`/dynamic`);
    

      // toast.success(response.data.message);
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
      const pageToFetch = name || "Blog";
      const response = await axiosInstance1.get("/dynamic/" + pageToFetch);
      return response.data.sections;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getCases = createAsyncThunk(
  "discounts/cases",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.get("/dynamic/Cases");
      return response.data.sections;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const modelOpen = createAsyncThunk(
  "discounts/section",
  async (_, { rejectWithValue }) => {

    openModel = !openModel;

  }
);

export const addSections = createAsyncThunk(
  "discounts/section",
  async (data, { rejectWithValue }) => {
    try {


      const formData = new FormData();

      formData.append("title", data?.title);
      formData.append("description", data?.description);
      formData.append("photo", data?.photo);
      formData.append("page", data?.page);

      const response = await axiosInstance1.post(`/dynamic/section`, formData);

      // toast.success(response.data.message);
      return response.data;
    } catch (error) {
      // toast.error(error?.response?.data?.message || "Failed to add Section");
      return rejectWithValue(error.response.data);
    }
  }
);

export const getInquiry = createAsyncThunk(
  "discounts/inquiry",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.get(`/inquiry`);


      return response.data;
    } catch (error) {
      // toast.error(error?.response?.data?.message || "Failed to add Section");
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteInquiry = createAsyncThunk(
  "discounts/inquiry",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.delete(`/inquiry/${id}`);
 

      return response.data;
    } catch (error) {
      // toast.error(error?.response?.data?.message || "Failed to add Section");
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAllInquiry = createAsyncThunk(
  "discounts/All/Inquiry",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.delete(`/inquiry/delete/all`);



      return response.data;
    } catch (error) {
      // toast.error(error?.response?.data?.message || "Failed to add Section");
      return rejectWithValue(error.response.data);
    }
  }
);

export const addChild = createAsyncThunk(
  "discounts/section/chid",
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
   


      return response.data;
    } catch (error) {
      // toast.error(error?.response?.data?.message || "Failed to add Section");
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSpecificSection = createAsyncThunk(
  "discounts/specificSection",
  async (data, { rejectWithValue }) => {
    try {


      const response = await axiosInstance1.post(`/dynamic/get/section`, data);


 
      return response.data;
    } catch (error) {
      // toast.error(error?.response?.data?.message || "Failed to add discount");
      return rejectWithValue(error.response.data);
    }
  }
);


export const getVendor = createAsyncThunk(
  "discounts/vendor",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.get(`/vendor`);

  
      return response.data;
    } catch (error) {
      // toast.error(error?.response?.data?.message || "Failed to Get Vendor");
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteVendor = createAsyncThunk(
  "discounts/vendor",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance1.delete(`/vendor/${id}`);



      return response.data;
    } catch (error) {
      // toast.error(error?.response?.data?.message || "Failed to add Section");
      return rejectWithValue(error.response.data);
    }
  }
);

export const addVendor = createAsyncThunk(
  "discounts/section",
  async (vendorData, { rejectWithValue }) => {
    try {

      const response = await axiosInstance1.post(`/vendor`, vendorData);



      return response.data;
    } catch (error) {
      // toast.error(error?.response?.data?.message || "Failed to add Section");
      return rejectWithValue(error.response.data);
    }
  }
);


export const submitInquiry = createAsyncThunk(
    "discounts/submit/inquiry",
    async (inquiryData, { rejectWithValue }) => {
      try {
  

      
        
        // const response = await axiosInstance1.post(`/contact`, inquiryData);

        const response=await axiosInstance1.post("/inquiry",inquiryData)
  
  
        // toast.success(response.data.message);
        return response.data;
      } catch (error) {
        // toast.error(error?.response?.data?.message || "Failed to add Section");
        return rejectWithValue(error.response.data);
      }
    }
);


const parentSlice = createSlice({
  name: "dynamicList",
  initialState,
  reducers: {},
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
        state.loading = false;
        state.sections = action?.payload;
      })
      .addCase(getCases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCases.fulfilled, (state, action) => {
        state.loading = false;
        const fetchedCases = Array.isArray(action?.payload) ? [...action.payload] : [];
        fetchedCases.sort((a, b) => {
          const dateA = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
          if (dateA && dateB && dateA !== dateB) {
            return dateB - dateA;
          }
          if (a?._id && b?._id) {
            return String(b._id).localeCompare(String(a._id));
          }
          return 0;
        });
        state.cases = fetchedCases;
      })
      .addCase(getCases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
   W
        
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

export default parentSlice.reducer;
