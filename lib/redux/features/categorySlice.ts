import { CategoryDTO, ResponseModel } from "@/lib/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../services/api";

interface CategoryState{
    categories:ResponseModel<CategoryDTO[]> | null;
    selectedCategory:CategoryDTO | null;
    isLoading:boolean;
    error:string | null;
}

const initialState : CategoryState = {
    categories:null,
    selectedCategory:null,
    isLoading:false,
    error:null
}

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_,{rejectWithValue}) => {
        try {
            const response = await api.get<ResponseModel<CategoryDTO[]>>('/Category/GetAllCategories');
            return response.data;
        }
        catch (error) {
            return rejectWithValue('Failed to fetch categories');
        }
    }
)
const categorySlice = createSlice({
    name:'categories',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchCategories.pending,(state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchCategories.fulfilled,(state,action) => {
            state.isLoading = false;
            state.categories = action.payload;
        })
        .addCase(fetchCategories.rejected,(state,action) =>{
            state.isLoading = false;
            state.error = action.payload as string;
        })
    }
})

export default categorySlice.reducer;