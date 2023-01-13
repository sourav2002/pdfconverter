import { configureStore, combineReducers } from "@reduxjs/toolkit";
import EntrySlice from "./EntrySlice";

const rootReducer = combineReducers({
    entry: EntrySlice,
  });

  const store = configureStore({
    reducer : rootReducer,
  })

  export default store;