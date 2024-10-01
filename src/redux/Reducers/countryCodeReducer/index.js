import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Config from '../../../../Config';
import { Api } from '../../apiList';


export const fetchCountryCodes = createAsyncThunk(
    'country/fetchCountryCodes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${Config.baseUrl}/${Api.country_code}`, {
                headers: Config.appHeaders
            });
            return response.data.data.map(country => ({
                name: country.entity,
                code: country.countryCode,
                currencyName : country.currencyName,
                currency : country.currencyCode
            }));
        } catch (error) {
            return rejectWithValue(error.response ? JSON.stringify(error.response.data) : error.message);
        }
    }
);

export const fetchGeolocationByIP = createAsyncThunk(
    'country/fetchGeolocationByIP',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://ipapi.co/json/', {
                timeout: 10000,
            });
            const { latitude, longitude, country_name } = response.data;
            return { latitude, longitude, countryName: country_name };
        } catch (error) {
            if (error.response) {
                return rejectWithValue(JSON.stringify(error.response.data));
            } else if (error.request) {
                return rejectWithValue('No response received');
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);


const initialState = {
    countryCodes: [],
    loading: false,
    error: null,
    selectedCountry: null,
    latitude: null,
    longitude: null,
    countryName: null,
};


const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        setSelectedCountry(state, action) {
            state.selectedCountry = action.payload;
        },
        resetState(state) {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountryCodes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCountryCodes.fulfilled, (state, action) => {
                state.loading = false;
                state.countryCodes = action.payload;
            })
            .addCase(fetchCountryCodes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchGeolocationByIP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGeolocationByIP.fulfilled, (state, action) => {
                state.loading = false;
                const { latitude, longitude, countryName } = action.payload;
                state.latitude = latitude;
                state.longitude = longitude;
                state.countryName = countryName;
                state.selectedCountry = countryName; 
            })
            .addCase(fetchGeolocationByIP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export const { setSelectedCountry, resetState } = countrySlice.actions;
export default countrySlice.reducer;
