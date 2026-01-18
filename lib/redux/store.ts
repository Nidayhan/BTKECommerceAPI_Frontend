import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./features/categorySlice";

export const store = configureStore({
    reducer:{
        //add your reducers here
        category: categorySlice,
    },

    middleware:(getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,})
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch