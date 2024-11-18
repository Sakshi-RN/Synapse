import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (_, { rejectWithValue }) => {
    try {

      
      const clientId = await AsyncStorage.getItem('authclientID');
      
      if (!clientId) {
        console.error('@@@ fetchAppointments: No clientID found in AsyncStorage');
        throw new Error('No clientID found');
      }

      const url = `https://eb1.taramind.com/getAllClientAppointments/${clientId}`;

      const response = await axios.get(url, {
        headers: {
          'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
        },
      });

      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data; 
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
      state.filteredAppointments = state.appointments.filter(
        (appointment) => appointment.date === selectedDate
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
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
