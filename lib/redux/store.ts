import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./features/categorySlice";
import productSlice from './features/productSlice';
import authSlice from './features/authSlice'
export const store = configureStore({
    reducer:{
        //add your reducers here
        category: categorySlice,
        product:productSlice,
        auth:authSlice
    },

    middleware:(getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,})
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch