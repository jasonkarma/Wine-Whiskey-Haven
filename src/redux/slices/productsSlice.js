import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../firebase/services';

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ category, sortBy, sortOrder, limit } = {}, { rejectWithValue }) => {
    try {
      const products = await getProducts(category, sortBy, sortOrder, limit);
      return products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const productId = await addProduct(productData);
      return { id: productId, ...productData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async ({ productId, updateData }, { rejectWithValue }) => {
    try {
      await updateProduct(productId, updateData);
      return { id: productId, ...updateData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeProduct = createAsyncThunk(
  'products/removeProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await deleteProduct(productId);
      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    filteredItems: [],
    status: 'idle',
    error: null,
    filters: {
      category: null,
      priceRange: [0, 10000],
      region: null,
      type: null,
      rating: null,
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredItems = state.items.filter(item => {
        const matchesCategory = !state.filters.category || item.category === state.filters.category;
        const matchesPriceRange = item.price >= state.filters.priceRange[0] && 
                                 item.price <= state.filters.priceRange[1];
        const matchesRegion = !state.filters.region || item.region === state.filters.region;
        const matchesType = !state.filters.type || item.type === state.filters.type;
        const matchesRating = !state.filters.rating || item.rating >= state.filters.rating;
        
        return matchesCategory && matchesPriceRange && matchesRegion && 
               matchesType && matchesRating;
      });
    },
    clearFilters: (state) => {
      state.filters = {
        category: null,
        priceRange: [0, 10000],
        region: null,
        type: null,
        rating: null,
      };
      state.filteredItems = state.items;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
        state.filteredItems = state.items;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Edit Product
      .addCase(editProduct.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };
        }
        state.filteredItems = state.items;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Remove Product
      .addCase(removeProduct.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(item => item.id !== action.payload);
        state.filteredItems = state.items;
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters, clearError } = productsSlice.actions;
export default productsSlice.reducer;
