import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  campaignList: [],
  users: {},
  loading: false,
};

export const fetchUserData = createAsyncThunk("campaign/getUsers", async () => {
  const users = await (
    await fetch("https://jsonplaceholder.typicode.com/users")
  ).json();
  return users;
});

const CampaignListingSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {
    addCampaigns: (state, action) => {
      action.payload.forEach((campaign) => {
        if (state.campaignList.findIndex((cgn) => cgn.id === campaign.id) < 0) {
          state.campaignList.push(campaign);
        }
      });
    },
  },
  extraReducers: {
    [fetchUserData.pending]: (state) => {
      state.loading = true;
    },
    [fetchUserData.rejected]: (state) => {
      state.loading = false;
    },
    [fetchUserData.fulfilled]: (state, { payload }) => {
      state.loading = false;
      payload.forEach((user) => {
        state.users[user.id] = user.name;
      });
    },
  },
});

export const { addCampaigns, addUsers } = CampaignListingSlice.actions;

export default CampaignListingSlice.reducer;
