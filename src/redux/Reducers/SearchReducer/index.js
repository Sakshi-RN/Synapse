import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Config from '../../../../Config';

export const searchProducts = createAsyncThunk(
    'product/searchProducts',
    async ({ searchText }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${Config.baseUrl}/v1/products?search=${searchText}`, {
                headers: Config.appHeaders,
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

const initialState = {
    searchResults: [],
    suggestions: [],
    loading: false,
    error: null,
    metadata: {
        total: 0,
        totalPages: 0,
        currentPage: 1,
        nextPage: null,
    },
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        resetState(state) {
            Object.assign(state, initialState);
        },
        updateSuggestions(state, action) {
            state.suggestions = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.metadata = action.payload.metadata;
                if (action.payload.metadata.currentPage === 1) {
                    state.searchResults = action.payload.products;
                } else {
                    state.searchResults = [...state.searchResults, ...action.payload.products];
                }
                state.suggestions = action.payload.products; // Update suggestions
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetState: resetSearchState, updateSuggestions } = searchSlice.actions;

export const search = {
    searchProducts,
    ...searchSlice.actions,
};

export default searchSlice.reducer;
