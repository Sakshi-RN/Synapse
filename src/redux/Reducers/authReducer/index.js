import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Config from '../../../../Config';
import { Api } from '../../apiList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const registerThread = createAsyncThunk(
    'registerThread',
    async (data, {rejectWithValue}) => {
        try{
            const response = await axios.post(`${Config.baseUrl}/${Api.register}`,
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

const registerOtpVerifyThread = createAsyncThunk(
    'registerOtpVerifyThread',
    async (data, {rejectWithValue}) => {
        try{
            const response = await axios.patch(`${Config.baseUrl}/${Api.register_otp_verify}`,
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

const loginThread = createAsyncThunk(
    'loginThread',
    async (data, {rejectWithValue}) => {
        try{
            const response = await axios.post(`${Config.baseUrl}/${Api.login_thread}`,
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

const logoutThread = createAsyncThunk(
    'logoutThread',
    async (data, {rejectWithValue}) => {
        try{
            let token = await AsyncStorage.getItem('token');
            const response = await axios.post(`${Config.baseUrl}/${Api.logout_thread}`,
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

const resendOTPForRegisterationThread = createAsyncThunk(
    'resendOTPForRegisterationThread',
    async (data, {rejectWithValue}) => {
        try{
            const response = await axios.patch(`${Config.baseUrl}/${Api.resend_otp_for_register}`,
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




const initialState = {
    registerData:[],
    registerLoading:false,
    registerStatus:false,
    registerError:false,
    regType:"",

    registerOtpVerifyData:[],
    registerOtpVerifyLoading:false,
    registerOtpVerifyStatus:false,
    registerOtpVerifyError:false,

    loginData:[],
    loginLoading:false,
    loginStatus:false,
    loginError:false,

    logoutData:[],
    logoutLoading:false,
    logoutStatus:false,
    logoutError:false,

    resendOTPData:[],
    resendOTPLoading:false,
    resendOTPStatus:false,
    resendOTPError:false,

}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetState: (state) => {
            Object.assign(state, initialState)
        },

        resetRegType: (state, action) => {
            return{
                ...state,
                regType:action?.payload?.value
            }
        }
    },
    extraReducers:(builder) =>{
        builder.addCase(registerThread.fulfilled, (state, { payload }) => {
            state.registerData = payload
            state.registerLoading = false,
            state.registerStatus = true,
            state.registerError = false
        }),

        builder.addCase(registerThread.pending, (state) => {
            state.registerLoading = true,
            state.registerStatus = false,
            state.registerError = false
        }),
        builder.addCase(registerThread.rejected, (state, { payload }) => {
            state.registerError = payload,
            state.registerLoading= false,
            state.registerStatus= false
        }),

        builder.addCase(registerOtpVerifyThread.fulfilled, (state, { payload }) => {
            state.registerOtpVerifyData = payload
            state.registerOtpVerifyLoading = false,
            state.registerOtpVerifyStatus = true,
            state.registerOtpVerifyError = false
        }),

        builder.addCase(registerOtpVerifyThread.pending, (state) => {
            state.registerOtpVerifyLoading = true,
            state.registerOtpVerifyStatus = false,
            state.registerOtpVerifyError = false
        }),
        builder.addCase(registerOtpVerifyThread.rejected, (state, { payload }) => {
            state.registerOtpVerifyError = payload,
            state.registerOtpVerifyLoading= false,
            state.registerOtpVerifyStatus= false
        }),

        builder.addCase(loginThread.fulfilled, (state, { payload }) => {
            if (payload?.token !== undefined) {
                AsyncStorage.setItem('token', JSON.stringify(payload?.token));
            } else {
                console.error('Token is undefined');
            }
            state.loginData = payload;
            state.loginLoading = false;
            state.loginStatus = true;
            state.loginError = false;
        }),
        

        builder.addCase(loginThread.pending, (state) => {
            state.loginLoading = true,
            state.loginStatus = false,
            state.loginError = false
        }),
        builder.addCase(loginThread.rejected, (state, { payload }) => {
            state.loginError = payload,
            state.loginLoading= false,
            state.loginStatus= false
        }),

        builder.addCase(logoutThread.fulfilled, (state, { payload }) => {
            state.logoutData = payload
            state.logoutLoading = false,
            state.logoutStatus = true,
            state.logoutError = false
        }),

        builder.addCase(logoutThread.pending, (state) => {
            state.logoutLoading = true,
            state.logoutStatus = false,
            state.logoutError = false
        }),
        builder.addCase(logoutThread.rejected, (state, { payload }) => {
            state.logoutError = payload,
            state.logoutLoading= false,
            state.logoutStatus= false
        })

        builder.addCase(resendOTPForRegisterationThread.fulfilled, (state, { payload }) => {
            state.resendOTPData = payload
            state.resendOTPLoading = false,
            state.resendOTPStatus = true,
            state.resendOTPError = false
        }),

        builder.addCase(resendOTPForRegisterationThread.pending, (state) => {
            state.resendOTPLoading = true,
            state.resendOTPStatus = false,
            state.resendOTPError = false
        }),
        builder.addCase(resendOTPForRegisterationThread.rejected, (state, { payload }) => {
            state.resendOTPError = payload,
            state.resendOTPLoading= false,
            state.resendOTPStatus= false
        })
    }    
})

export const auth = {  
    registerThread,
    registerOtpVerifyThread,
    loginThread,
    logoutThread,
    resendOTPForRegisterationThread,
    ...authSlice.actions 
}
export default authSlice.reducer
