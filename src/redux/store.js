import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import wishlistReducer from './slices/wishlistSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
