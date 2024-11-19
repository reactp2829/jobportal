import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    userAllJobs : [],
    allAdminJobs: [],
    allUserJobs : [],
    singleJob: null,
    isAppliedJob: false,
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
  },
  reducers: {
    //actions
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setAllUserJobs: (state, action) => {
      state.allUserJobs = action.payload;
    },
    setIsAppliedJob: (state, action) => {
      state.isAppliedJob = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setUserAllJobs : (state,action)=>{
      state.userAllJobs = action.payload;
    }
  },
});
export const {
  setAllJobs,
  setSingleJob,
  setIsAppliedJob,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
  setAllAdminJobs,
  setAllUserJobs,
  setUserAllJobs,
} = jobSlice.actions;
export default jobSlice.reducer;
