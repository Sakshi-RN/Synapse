import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (_, { rejectWithValue }) => {
    try {

      
      const clientId = await AsyncStorage.getItem('authclientID');
      console.log('@@@ fetchAppointments: Retrieved clientId:', clientId);
      
      if (!clientId) {
        console.error('@@@ fetchAppointments: No clientID found in AsyncStorage');
        throw new Error('No clientID found');
      }

      const url = `https://eb1.taramind.com/getAllClientAppointments/${clientId}`;
      console.log('@@@ fetchAppointments: Fetching from URL:', url);

      // Make API request
      const response = await axios.get(url, {
        headers: {
          'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
        },
      });

      console.log('@@@ fetchAppointments: API Response:', response.data);

      // Check if response contains appointments (adapted to match array structure)
      if (Array.isArray(response.data) && response.data.length > 0) {
        console.log('@@@ fetchAppointments: Appointments found:', response.data);
        return response.data; // Return the array directly
      } else {
        console.error('@@@ fetchAppointments: No appointments found in response');
        throw new Error('No appointments found');
      }
    } catch (error) {
      console.error('@@@ fetchAppointments: Error occurred:', error.message);
      console.error('@@@ fetchAppointments: Error response:', error.response?.data);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    filteredAppointments: [],
    availableDates: [],
    loading: false,
    error: null,
  },
  reducers: {
    filterAppointments: (state, action) => {
      const selectedDate = action.payload;
      console.log('@@@ filterAppointments: Filtering for date:', selectedDate);
      state.filteredAppointments = state.appointments.filter(
        (appointment) => appointment.date === selectedDate
      );
      console.log('@@@ filterAppointments: Filtered appointments:', state.filteredAppointments);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        console.log('@@@ fetchAppointments.pending: Fetching appointments started');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        console.log('@@@ fetchAppointments.fulfilled: Fetching appointments successful');
        state.loading = false;
        state.appointments = action.payload;
        state.filteredAppointments = action.payload;
        state.availableDates = action.payload.map((appointment) => appointment.date);
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        console.error('@@@ fetchAppointments.rejected: Fetching appointments failed');
        console.error('@@@ fetchAppointments.rejected: Error:', action.payload);
        state.loading = false;
        state.error = action.payload || 'Failed to fetch appointments';
      });
  },
});

export const { filterAppointments } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
