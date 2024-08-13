import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    loading: false,
    applyJob: null,
    applicants: [],
  },
  reducers: {
    setApplyJobs: (state, action) => {
      state.applyJob = action.payload;
    },
    setAllApplicants: (state, action) => {
      state.applicants = action.payload;
    },
  },
});

export const { setApplyJobs, setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;
