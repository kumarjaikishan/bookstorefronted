import { configureStore } from "@reduxjs/toolkit";
import login from "./login";
import tournacenter from './api'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key: "BookStore",
    version: 1,
    storage: storage
}
const reducer = combineReducers({
    login: login,
    tournacenter: tournacenter,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
export default store;