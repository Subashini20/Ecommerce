import { configureStore, createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartProducts: [],
    wishList: [],
    totalCount: 0,
  },
  reducers: {
    productAdded: (state, action) => {
      state.cartProducts.push(action.payload);
      state.totalCount += 1;
    },
    productCountIncreased: (state, action) => {
      const product = state.cartProducts.find((p) => p.id === action.payload);
      if (product) {
        product.count += 1;
        state.totalCount += 1;
      }
    },
    productCountDecreased: (state, action) => {
      const product = state.cartProducts.find((p) => p.id === action.payload);
      if (product) {
        if (product.count > 1) {
          product.count -= 1;
          state.totalCount -= 1;
        }
      }
    },
    productRemoved: (state, action) => {
      const { itemIndex, count } = action.payload;
      state.cartProducts.splice(itemIndex, 1);
      state.totalCount -= count;
    },
    cartCleared: (state) => {
      state.cartProducts = [];
      state.totalCount = 0;
    },
    totalCountAdded: (state, action) => {
      const { index, count } = action.payload;
      const product = state.cartProducts[index];
      if (product) {
        state.totalCount -= product.count;
        product.count = count;
        state.totalCount += count;
      }
    },
    wishListAdded: (state, action) => {
      state.wishList.push(action.payload);
    },
    totalCountCleared: (state) => {
      state.totalCount = 0;
    },
    wishListRemoved: (state, action) => {
      state.wishList = state.wishList.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  productAdded,
  productCountIncreased,
  productCountDecreased,
  productRemoved,
  cartCleared,
  totalCountAdded,
  wishListAdded,
  totalCountCleared,
  wishListRemoved,
} = cartSlice.actions;

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export default store;
