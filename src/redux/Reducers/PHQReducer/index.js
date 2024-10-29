// phqSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSurveyData = createAsyncThunk(
  'phq/fetchSurveyData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://eb1.taramind.com/getClientAssessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': 'e1693d9245c57be86afc22ad06eda84c9cdb74dae6d56a8a7f71a93facb1f42b',
        },
        body: JSON.stringify({
          clientId: 'a3ed224c-48d9-11ef-9c86-02f35b8058b3',
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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurveyData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSurveyData.fulfilled, (state, action) => {
        state.loading = false;
        state.surveyData = action.payload;
      })
      .addCase(fetchSurveyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectSurveyData = (state) => state.phq.surveyData;
export const selectLoading = (state) => state.phq.loading;

export default phqSlice.reducer;
