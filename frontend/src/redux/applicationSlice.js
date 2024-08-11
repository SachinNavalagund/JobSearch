import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    loading: false,
    applyJob: null,
  },
  reducers: {
    setApplyJobs: (state, action) => {
      state.applyJob = action.payload;
    },
  },
});

export const { setApplyJobs } = applicationSlice.actions;
export default applicationSlice.reducer;
