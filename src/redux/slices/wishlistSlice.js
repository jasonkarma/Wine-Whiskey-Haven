import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateWishlist, getUserData } from '../../firebase/services';

// Async thunks
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (userId, { rejectWithValue }) => {
    try {
      const userData = await getUserData(userId);
      return userData?.wishlist || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserWishlist = createAsyncThunk(
  'wishlist/updateUserWishlist',
  async ({ userId, items }, { rejectWithValue }) => {
    try {
      await updateWishlist(userId, items);
      return items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    clearWishlist: (state) => {
      state.items = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(updateUserWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  toggleWishlist,
  clearWishlist,
  clearError,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
