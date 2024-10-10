

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (_, { rejectWithValue }) => {
  try {
      const clientId = '9bfea3d5-74f4-11ef-9c86-02f35b8058b3';
      const apiKey = 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b'; 
      
      const response = await fetch('https://eb1.taramind.com/getuserData', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-API-KEY': apiKey,
          },
          body: JSON.stringify({ clientId }),
      });

      if (!response.ok) {
          throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.log('Fetch Error:', error);
      return rejectWithValue('Network error');
  }
});

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        data: {},
        fetchLoading: false,
        fetchError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.fetchLoading = true;
                state.fetchError = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.fetchLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.fetchLoading = false;
                state.fetchError = action.payload || 'Failed to fetch profile data';
            });
    },
});

export default profileSlice.reducer;
