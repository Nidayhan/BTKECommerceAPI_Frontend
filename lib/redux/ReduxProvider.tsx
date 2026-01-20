"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { loadUserFromStorage } from "./features/authSlice";

export function ReduxProvider({children}:{children:React.ReactNode}){

    useEffect(()=>{
        store.dispatch(loadUserFromStorage());
    },[])
    
    return <Provider store={store}>{children}</Provider>
}