import { LoginRequest, ResponseModel, User } from "@/lib/type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../services/api";
import {jwtDecode} from "jwt-decode"



interface AuthState {
    user:User|null,
    token:string|null,
    isLoading:boolean,
    error:string|null,
    isAuthenticated:boolean
}


const initialState: AuthState = 
{
    user:null,
    token:null,
    isLoading:false,
    error:null,
    isAuthenticated:false
}


export const login = createAsyncThunk(
    'auth/login',
    async (credentials:LoginRequest,{rejectWithValue}) => {
        try{

            const response = await api.post<ResponseModel<User>>('/Auth/Login',credentials);
            const user = response.data.data;
            const decodedToken = jwtDecode(user.token);
            const roles = (decodedToken as any).role as string[];
            user.roles = Array.isArray(roles) ? roles : [roles]
            localStorage.setItem("token",user.token);
            localStorage.setItem("user",JSON.stringify(user))
            return user;

        }catch{
            return rejectWithValue("Login Failed")
        }
    }
)

export const loadUserFromStorage = createAsyncThunk(
    'auth/loadUserFromStorage',
    async(_,{rejectWithValue}) => {
        try{
            const token = localStorage.getItem("token");
            const userData = localStorage.getItem("user");
            if(token && userData){
                const user : User = JSON.parse(userData);
                if(!user.roles || user.roles.length === 0){
                     const decodedToken = jwtDecode(user.token);
                     const roles = (decodedToken as any).role as string[];
                     user.roles = Array.isArray(roles) ? roles : [roles]
                }
                return {user,token}
            }else {
            return rejectWithValue("No Found Token And User Data")

            }
        }catch{
            return rejectWithValue("Failed To Load User From Storage")
        }
    }
)




const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout : (state) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers:(builder) => {
        builder.addCase(login.pending,(state) => {
            state.isLoading = true;
            state.error = null
        })
        .addCase(login.fulfilled,(state,action:PayloadAction<User>) => {
            state.isLoading = false;
            state.user = action.payload;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        })
        .addCase(login.rejected,(state,action) => {
            state.isLoading = false;
            state.error = action.payload as string;
            state.isAuthenticated = false;
        })
        .addCase(loadUserFromStorage.fulfilled,(state,action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        })
    }
})

export const {logout} = authSlice.actions;
export default authSlice.reducer;