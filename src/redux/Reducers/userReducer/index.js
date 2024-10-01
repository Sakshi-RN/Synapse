import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Config from '../../../../Config';
import { Api } from '../../apiList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const changePasswordThread = createAsyncThunk(
    'changePasswordThread',
    async (data, {rejectWithValue}) => {
        try{
            let token = await AsyncStorage.getItem('token');
            const response = await axios.patch(`${Config.baseUrl}/${Api.change_password}`,
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

const initialState = {
    changePasswordData:[],
    changePasswordLoading:false,
    changePasswordStatus:false,
    changePasswordError:false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetState: (state) => {
            Object.assign(state, initialState)
        }
    },
    extraReducers:(builder) =>{
        builder.addCase(changePasswordThread.fulfilled, (state, { payload }) => {
            state.changePasswordData = payload
            state.changePasswordLoading = false,
            state.changePasswordStatus = true,
            state.changePasswordError = false
        }),

        builder.addCase(changePasswordThread.pending, (state) => {
            state.changePasswordLoading = true,
            state.changePasswordStatus = false,
            state.changePasswordError = false
        }),
        builder.addCase(changePasswordThread.rejected, (state, { payload }) => {
            state.changePasswordError = payload,
            state.changePasswordLoading= false,
            state.changePasswordStatus= false
        })
    }    
})

export const user = {  
    changePasswordThread,
    ...userSlice.actions 
}
export default userSlice.reducer
