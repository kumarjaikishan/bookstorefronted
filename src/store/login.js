import { createSlice } from "@reduxjs/toolkit";

const islogin = createSlice({
    name:"login",
    initialState:{
        islogin:false,
        head:"LogIn",
        loader:false,
        userType:'retail',
    },
    reducers:{
        setlogin(state, action){
           state.islogin = action.payload;
        },
        header(state, action){
           state.head = action.payload;
        },
        setloader(state, action){
           state.loader = action.payload;
        },
        setuser(state, action){
           state.userType = action.payload;
        },
        setlogout(state, action){
           state.userType = 'retail';
           state.islogin = false;
        }
    }

})
export const {setlogout,setuser,setlogin,header,setloader}= islogin.actions;
export default islogin.reducer;