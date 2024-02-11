
import { configureStore } from "@reduxjs/toolkit";  
import UserSlice from "./Slices/UserSlice"; 
import BlogSlice from "./Slices/BlogSlice";


const Store  = configureStore({ 
     reducer : { 
        user : UserSlice ,  
        blog: BlogSlice, 
     } 
})


export default Store ; 