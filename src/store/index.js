import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./UiSlice";
import cartSlice from "./cartSlice";
import accountSlice from "./accountSlice";



const store = configureStore({
    reducer:{ui:uiSlice.reducer,cart:cartSlice.reducer,account:accountSlice.reducer}
})

export default store