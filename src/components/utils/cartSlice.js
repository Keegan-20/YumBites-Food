import { createSlice} from "@reduxjs/toolkit";
//creating  slices in the Redux store
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items:[], //initial state values
  },
  reducers: {
      //addItem :action Name where state & actions  are  arguments
      addItem: (state, action) => {
        const newItem = { ...action.payload, quantity: action.payload.quantity || 1 };
        state.items.push(newItem);
      },
      
      removeItem: (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
    },
      clearCart: (state) => {
      state.items = [];
    },

    updateCartItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },

  },
});
  
//addItem, removeItem, clearCart are all actions  that will call a reducer function
export const {addItem,removeItem,clearCart,updateCartItemQuantity} = cartSlice.actions;
export default cartSlice.reducer;