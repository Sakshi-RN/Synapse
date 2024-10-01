import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Config from '../../../../Config';
import { Api } from '../../apiList';

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async ({ page = 1 }, { rejectWithValue, getState }) => {
        const { metadata } = getState().product;
        try {
            const response = await axios.get(`${Config.baseUrl}/${Api.getProducts}`, {
                headers: Config.appHeaders,
                params: { page }
            });
            return {
                products: response?.data?.data,
                metadata: response?.data?.metadata,
            };
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

const getProductDetailsThread = createAsyncThunk(
    'getProductDetailsThread',
    async (data) => {
        const response = await axios.get(`${Config.baseUrl}/${Api.get_product_details}/${data?.productId}`,
            {
                headers: {
                    ...Config.appHeaders,
                },
            }
        )

        return response.data
    }
)

const initialState = {
    products: [],
    loading: false,
    error: null,
    metadata: {
        total: 0,
        totalPages: 0,
        currentPage: 1,
        nextPage: null,
    },

    productDetailsData:[],
    productDetailsLoading:false,
    productDetailsStatus:false,
    productDetailsError:false
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        resetState(state) {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.metadata = action.payload.metadata;
                if (action.payload.metadata.currentPage === 1) {
                    state.products = action.payload.products;
                } else {
                    state.products = [...state.products, ...action.payload.products];
                }
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),

        builder.addCase(getProductDetailsThread.fulfilled, (state, { payload }) => {
            state.productDetailsData = payload?.data,
            state.productDetailsLoading = false,
            state.productDetailsStatus = true,
            state.productDetailsError = false
        }),

        builder.addCase(getProductDetailsThread.pending, (state) => {
            state.productDetailsLoading = true,
            state.productDetailsStatus = false,
            state.productDetailsError = false
        }),
        builder.addCase(getProductDetailsThread.rejected, (state, { payload }) => {
            state.productDetailsError = payload,
            state.productDetailsLoading= false,
            state.productDetailsStatus= false
        })
    },
});

// export const { resetState: resetProductState } = productSlice.actions;
export const product = {  
    fetchProducts,
    getProductDetailsThread,
    ...productSlice.actions 
}

export const productReducer = productSlice.reducer;
