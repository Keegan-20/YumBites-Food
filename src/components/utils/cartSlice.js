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
        state.items = state.items.filter(item => item.id !== action.payload);
    },
      clearCart: (state) => {
      state.items = [];
    },

    updateCartItemQuantity(state, action) {
      const { itemId, quantity } = action.payload;
      // Find the index of the cart item by its itemId
      const itemIndex = state.items.findIndex(item => item.id === itemId);
      // If the item is found, update its quantity
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity = quantity;
      }
    },
  },
});

//addItem, removeItem, clearCart are all actions  that will call a reducer function
export const {addItem,removeItem,clearCart,updateCartItemQuantity} = cartSlice.actions;
export default cartSlice.reducer;