import { ProductDTO, ResponseModel } from "@/lib/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../services/api";

interface ProductState {
    products: ResponseModel<ProductDTO[]> | null;
    selectedProduct: ProductDTO | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: null,
    selectedProduct: null,
    isLoading: false,
    error: null,
}

export const fetchProductsByCategoryId = createAsyncThunk(
    "products/fetchProductsByCategoryId",
    async (categoryId: string | undefined, { rejectWithValue }) => {
        try {
            const url = categoryId 
                ? `/Product/GetProductsByCategoryId?categoryId=${categoryId}` 
                : "/Product/GetAllProducts";
            const response = await api.get<ResponseModel<ProductDTO[]>>(url);
            return response.data;
        } catch {
            return rejectWithValue("Failed to fetch products");
        }
    }
)

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {      
        //  Uygulamada oluşan hata mesajlarını temizlemek için kullanılır.
        clearError: (state) => {
            state.error = null;
        },
        // Kullanıcının seçtiği/üzerinde çalıştığı belirli bir ürünü state'de saklamak.
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsByCategoryId.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProductsByCategoryId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchProductsByCategoryId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
})

export const { clearError, setSelectedProduct } = productSlice.actions;
export default productSlice.reducer; 