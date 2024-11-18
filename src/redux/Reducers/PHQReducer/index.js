
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchSurveyData = createAsyncThunk(
  'phq/fetchSurveyData',
  async (_, { rejectWithValue }) => {
    try {
      const clientId =await AsyncStorage.getItem('authclientID')
        if (!clientId) {
            Alert.alert('Error', 'No clientID found');
            return rejectWithValue('No clientID found');
        }
      const response = await fetch('https://eb1.taramind.com/getClientAssessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
        },
        body: JSON.stringify({
          body: JSON.stringify({ clientId }),
          assessmentName: 'PHQ-9',
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const phqSlice = createSlice({
  name: 'phq',
  initialState: {
    surveyData: [],
    loading: false,
    error: null,
    fetchLoading: false,
    fetchError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchSurveyData.pending, (state) => {
      state.fetchLoading = true;
      state.fetchError = null;
    })
    .addCase(fetchSurveyData.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.surveyData = action.payload;
    })
    .addCase(fetchSurveyData.rejected, (state, action) => {
      state.fetchLoading = false;
      state.fetchError = action.payload;
    });
      
  },
});

export const selectSurveyData = (state) => state.phq.surveyData;
export const selectLoading = (state) => state.phq.fetchLoading;
export const selectError = (state) => state.phq.fetchError;

export default phqSlice.reducer;
