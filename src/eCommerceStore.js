/**
 * Redux Store for eCommerce data
 * 
 * 1. cart
 *    - Create a slice for Cart specific data and its actions to update the data
 *    - initial cart data is []
 * 2. user
 *    - Create a slice for User specific data and its actions to update the data
 * 3. searchHistory
 *    - Create a slice for Search specific data and its actions to update the data
 */

 import { configureStore, createSlice } from '@reduxjs/toolkit';
import apiCall from './services/apiCall';
import { act } from 'react-dom/test-utils';

 const cartSlice = createSlice({
   name: "cart",
   initialState: [],
   reducers: {
     addToCart: (state, action) => {
       state.push(action.payload);
       const addProduct = {
        id: action.payload.id,
        title:action.payload.title,
        description: action.payload.description,
        price: action.payload.price,
        image: action.payload.image
       }
       apiCall.post("/cart",JSON.stringify(addProduct),{
        headers: {
          "Content-Type" : "application/json"
        }
       })
     },
     removeFromCart: (state, action) => {
       state.splice(action.payload, 1);
     },
     updateCart: (state, action) => {
       state[action.payload.index] = action.payload.value;
     },
     clearCart: (state, action) => {
       state.length = 0;
     }
     
   }
 })
 
 export const cartActions = cartSlice.actions;
 
 const commerceStore = configureStore({
   reducer: {
     cart: cartSlice.reducer
   }
 })
 
 export default commerceStore;
 