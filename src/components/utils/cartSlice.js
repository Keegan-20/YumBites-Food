import { createSlice,createSelector } from "@reduxjs/toolkit";
//creating  slices in the Redux store
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items:[], //initial state values
  },
  reducers: {
      //addItem :action Name where state & actions  are  arguments
      addItem: (state, action) => {
        const newItem = { ...action.payload, quantity: 1 };
        state.items.push(newItem);
      },
      
      removeItem: (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
    },
      clearCart: (state) => {
      state.items = [];
    },

      updateCartItemQuantity: (state, action) => {
        const { itemId, quantity } = action.payload;
        const item = state.items.find(item => item.id === itemId);
        if (item) {
          item.quantity = quantity;
        }
      },
    },
  });

  export const selectTotal = createSelector(
    state => state.cart.items,
    items => items.reduce((total, item) => {
      console.log(`Price: ${item.price/100}, Quantity: ${item.quantity}`);
      return total + item.price/100  * item.quantity;
    }, 0)
  );
  
  
//addItem, removeItem, clearCart are all actions  that will call a reducer function
export const {addItem,removeItem,clearCart,updateCartItemQuantity} = cartSlice.actions;
export default cartSlice.reducer;