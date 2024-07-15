import {configureStore} from "@reduxjs/toolkit"; //to combine the slices into a single store
import sidebarReducer from "./sidebarSlice";
import categoryReducer from "./CategorySlice";
import productReducer from "./ProductSlice";
import cartReducer from "./CartSlice";
import searchReducer from "./SearchSlice";

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        category: categoryReducer,
        product: productReducer,
        cart: cartReducer,
        search: searchReducer
    }
});

export default store;


