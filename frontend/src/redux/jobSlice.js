import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    loading: false,
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJob: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSerachAdminJob: (state, action) => {
      state.searchJobByText = action.payload;
    },
  },
});

export const { setAllJobs, setSingleJob, setAllAdminJob, setSerachAdminJob } =
  jobSlice.actions;
export default jobSlice.reducer;
