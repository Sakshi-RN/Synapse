import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Config from '../../../../Config';
import { Api } from '../../apiList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getCountriesThread = createAsyncThunk(
    'getCountriesThread',
    async (data, {rejectWithValue}) => {
        try{
            const response = await axios.get(`${Config.baseUrl}/${Api.get_countries}`,
            data,
            {
                headers: {  
                    ...Config.appHeaders,
                },
            })
        
            return response.data

        }catch(error){
            return rejectWithValue(error.response.data)
        }
    }
)

const saveCarbonCalculationThread = createAsyncThunk(
    'saveCarbonCalculationThread',
    async (data, {rejectWithValue}) => {
        try{
            let token = await AsyncStorage.getItem('token');
            const response = await axios.patch(`${Config.baseUrl}/${Api.save_carbon}`,
            data,
            {
                headers: {  
                    ...Config.appHeaders,
                    Authorization: `Bearer ${JSON.parse(token)}`
                },
            })
        
            return response.data

        }catch(error){
            return rejectWithValue(error.response.data)
        }
    }
)

const getCarbonMetricsThread = createAsyncThunk(
    'getCarbonMetricsThread',
    async (data) => {
        let token = await AsyncStorage.getItem('token')
        const response = await axios.get(`${Config.baseUrl}/${Api.get_metrics}`,
            {
                headers: {
                    ...Config.appHeaders,
                    Authorization: `Bearer ${JSON.parse(token)}`
                },
            }
        )
        return response.data
    }
)

const initialState = {
    countriesData:[],
    countriesLoading:false,
    countriesStatus:false,
    countriesError:false,

    carbonData:[],
    carbonLoading:false,
    carbonStatus:false,
    carbonError:false,

    metricsData:[],
    metricsLoading:false,
    metricsStatus:false,
    metricsError:false

}

export const carbonSlice = createSlice({
    name: 'carbon',
    initialState,
    reducers: {
        resetState: (state) => {
            Object.assign(state, initialState)
        }
    },
    extraReducers:(builder) =>{
        builder.addCase(getCountriesThread.fulfilled, (state, { payload }) => {
            state.countriesData = payload,
            state.countriesLoading = false,
            state.countriesStatus = true,
            state.countriesError = false
        }),

        builder.addCase(getCountriesThread.pending, (state) => {
            state.countriesLoading = true,
            state.countriesStatus = false,
            state.countriesError = false
        }),
        builder.addCase(getCountriesThread.rejected, (state, { payload }) => {
            state.countriesError = payload,
            state.countriesLoading= false,
            state.countriesStatus= false
        }),

        builder.addCase(saveCarbonCalculationThread.fulfilled, (state, { payload }) => {
            state.carbonData = payload,
            state.carbonLoading = false,
            state.carbonStatus = true,
            state.carbonError = false
        }),

        builder.addCase(saveCarbonCalculationThread.pending, (state) => {
            state.carbonLoading = true,
            state.carbonStatus = false,
            state.carbonError = false
        }),
        builder.addCase(saveCarbonCalculationThread.rejected, (state, { payload }) => {
            state.carbonError = payload,
            state.carbonLoading= false,
            state.carbonStatus= false
        }),

        builder.addCase(getCarbonMetricsThread.fulfilled, (state, { payload }) => {
            state.metricsData = payload,
            state.metricsLoading = false,
            state.metricsStatus = true,
            state.metricsError = false
        }),

        builder.addCase(getCarbonMetricsThread.pending, (state) => {
            state.metricsLoading = true,
            state.metricsStatus = false,
            state.metricsError = false
        }),
        builder.addCase(getCarbonMetricsThread.rejected, (state, { payload }) => {
            state.metricsError = payload,
            state.metricsLoading= false,
            state.metricsStatus= false
        })
    }    
})

export const carbon = {  
    getCountriesThread,
    saveCarbonCalculationThread,
    getCarbonMetricsThread,
    ...carbonSlice.actions 
}
export default carbonSlice.reducer
