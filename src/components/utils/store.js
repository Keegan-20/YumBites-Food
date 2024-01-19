import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "./cartSlice";

//we have used reduxtoolkit to create redux store
const store =configureStore({
reducer:{
    cart:cartSlice,
 },
});

export default store;

/** using reduxtoolkit:
 * 1. Creating redux store:
 * -configureStore()---RTK
 * 
 * 2.Provide my store to app:
 * --Provider Component = {store} --imported from react-redux
 * 
 * 3.Creating a Slice---RTK
 * -createSlice({
 * name:"",
 * initialState:
 * reducers:{
 * actionName:(state,action)=>{ reducer func}
 * }
 * })
 * 
 * 4.exporting the cartSlice
 * - export const {addItem,removeItem,clearCart}=cartSlice.actions
 * - export default cartSlice.reducer;
 * 
 * 5.Putting the slice into the store
 * -{
 * reducer:{
 * cart:cartSlice,
 * user:userSlice
 * }}
 * 
 */