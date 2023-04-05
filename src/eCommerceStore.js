import { configureStore, createSlice } from '@reduxjs/toolkit';
import apiCall from './services/apiCall';
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartProducts: [],
    favourites: [],
    totalCount: 0,
  },
  reducers: {
    AddToFavourite: (state, action) => {
      state.favourites.push(action.payload);
    },
    ClearTotalCount: (state) => {
      state.totalCount = 0;
    },
    RemoveFavourite: (state, action) => {
      state.favourites = state.favourites.filter((item) => item.id !== action.payload);
    },

    AddToCart: (state, action) => {
      state.totalCount += 1;
      state.cartProducts.push(action.payload);
      const addProduct = {
        id: action.payload.id,
        name:action.payload.product,
        price: action.payload.price,
       }
       apiCall.post("/cart",JSON.stringify(addProduct),{
        headers: {
          "Content-Type" : "application/json"
        }
       })
    },
    RemoveProduct: (state, action) => {
      const { itemIndex, count } = action.payload;
      state.cartProducts.splice(itemIndex, 1);
      state.totalCount -= count;
    },
    ClearCart: (state) => {
      state.cartProducts = [];
      state.totalCount = 0;
    },
    IncrementProduct: (state, action) => {
      const product = state.cartProducts.find((p) => p.id === action.payload);
      if (product) {
        product.count += 1;
        state.totalCount += 1;
      }
    },
    DecrementProduct: (state, action) => {
      const product = state.cartProducts.find((p) => p.id === action.payload);
      if (product) {
        if (product.count > 1) {
          product.count -= 1;
          state.totalCount -= 1;
        }
      }
    },
    IncreaseTotalCount: (state, action) => {
      const { index, count } = action.payload;
      const product = state.cartProducts[index];
      if (product) {
        state.totalCount -= product.count;
        product.count = count;
        state.totalCount += count;
      }
    },
    
  },
});

export const {
  AddToCart,
  IncrementProduct,
  DecrementProduct,
  RemoveProduct,
  ClearCart,
  IncreaseTotalCount,
  AddToFavourite,
  ClearTotalCount,
  RemoveFavourite,
} = cartSlice.actions;

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export default store;
