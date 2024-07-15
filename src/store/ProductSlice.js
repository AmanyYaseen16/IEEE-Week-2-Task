import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../status";


const URL = 'https://dummyjson.com/products';
const initialState = {
    products:[],
    productsStatus: STATUS.IDLE,
    productSingle: [],
    productSingleStatus: STATUS.IDLE
}


const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{},
    extraReducers: (builder) => {  //there are three probable state for the promise returned from the API call -> pending, fulfilled, rejected.
        builder
        .addCase(fetchProducts.pending, (state, action) => {
            state.productsStatus = STATUS.LOADING;
        })
        .addCase(fetchProducts.fulfilled, (state,action) => {
            state.productsStatus = STATUS.SUCCEEDED;
            state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.productsStatus = STATUS.FAILED;
        })
        .addCase(fetchProductSingle.pending, (state, action) => {
            state.productSingleStatus = STATUS.LOADING;
        })
        .addCase(fetchProductSingle.fulfilled, (state,action) => {
            state.productSingleStatus = STATUS.SUCCEEDED;
            state.productSingle = action.payload;
        })
        .addCase(fetchProductSingle.rejected, (state,action) => {
            state.productSingleStatus = STATUS.FAILED;
        })
    }
});

export const fetchProducts = createAsyncThunk('products/fetch', async(limit) => {
    const response = await fetch(`${URL}?limit=${limit}`);  // get limited list of products 
    const data = await response.json();
    return data.products;
});

export const fetchProductSingle = createAsyncThunk('product-single/fetch', async(id) => {
    const response = await fetch(`${URL}/${id}`);
    const data = await response.json();
    return data;
});

export const getProducts = (state) => state.product.products;
export const getProductsStatus = (state) => state.product.productsStatus;
export const getProductSingle = (state) => state.product.productSingle;
export const getSingleProductStatus = (state) => state.product.productSingleStatus;
export default productSlice.reducer;