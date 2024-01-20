import { createSlice } from "@reduxjs/toolkit";

//creating  slices in the Redux store
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items:[], //initial state values
  },
  reducers: {
      //addItem :action Name where state & actions  are  arguments
      addItem: (state, action) => {
      state.items.push(action.payload); //action.payload is used to send data
    },
      removeItem: (state, action) => {
      state.items.pop();
    },
      clearCart: (state) => {
      state.items = [];
    },
  },
});

//addItem, removeItem, clearCart are all actions  that will call a reducer function
export const {addItem,removeItem,clearCart} = cartSlice.actions;
export default cartSlice.reducer;