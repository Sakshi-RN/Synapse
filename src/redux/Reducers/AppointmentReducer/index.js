import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('https://eb1.taramind.com/getAllClientAppointments/9bfea3d5-74f4-11ef-9c86-02f35b8058b3', {
        method: 'GET',
        headers: {
          'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
        },
      });
      const data = await response.json();
      console.log('API Response:', data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default appointmentsSlice.reducer;
