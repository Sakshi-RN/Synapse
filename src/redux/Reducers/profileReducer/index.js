
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (clientID, { rejectWithValue }) => {
    try {
        const apiKey = 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b';
        const clientId = '9bfea3d5-74f4-11ef-9c86-02f35b8058b3';
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
        return rejectWithValue('Network error');
    }
});


export const updateProfile = createAsyncThunk('profile/updateProfile', async (profileData, { rejectWithValue }) => {
    try {
        const apiKey = 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b';

        const response = await fetch('https://eb1.taramind.com/updateUserInfo/9bfea3d5-74f4-11ef-9c86-02f35b8058b3', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey,
            },
            body: JSON.stringify(profileData),
        });

        if (!response.ok) {
            throw new Error('Failed to update profile');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue('Network error');
    }
});


const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        data: {},
        fetchLoading: false,
        fetchError: null,
        updateLoading: false,
        updateError: null,
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
            })


            .addCase(updateProfile.pending, (state) => {
                state.updateLoading = true;
                state.updateError = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.data = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.updateLoading = false;
                state.updateError = action.payload || 'Failed to update profile data';
            });
    },
});

export default profileSlice.reducer;
