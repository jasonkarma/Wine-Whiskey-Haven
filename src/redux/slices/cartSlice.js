import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateCart, getUserData } from '../../firebase/services';

// Async thunks
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId, { rejectWithValue }) => {
    try {
      const userData = await getUserData(userId);
      return userData?.cart || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserCart = createAsyncThunk(
  'cart/updateUserCart',
  async ({ userId, items }, { rejectWithValue }) => {
    try {
      await updateCart(userId, items);
      return items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
    deliveryOption: null,
    shippingAddress: null,
    loading: false,
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = state.items.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
        state.total = state.items.reduce((sum, item) => 
          sum + (item.price * item.quantity), 0);
      }
    },
    setDeliveryOption: (state, action) => {
      state.deliveryOption = action.payload;
    },
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.deliveryOption = null;
      state.shippingAddress = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.total = state.items.reduce((sum, item) => 
          sum + (item.price * item.quantity), 0);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Cart
      .addCase(updateUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.total = state.items.reduce((sum, item) => 
          sum + (item.price * item.quantity), 0);
      })
      .addCase(updateUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  setDeliveryOption,
  setShippingAddress,
  clearCart,
  clearError,
} = cartSlice.actions;

export default cartSlice.reducer;
