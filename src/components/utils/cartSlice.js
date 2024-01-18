import { createSlice } from "@reduxjs/toolkit";

//creating a slice in the Redux store
const  cartSlice = createSlice({
    name: 'cart',
    initialState: {
    items:[],
   },
   reducers:{
    addItem: (state,action) => {
       state.items.push(action.payload);
    }
   }  
})