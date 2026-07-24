import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./reducer";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
  },
});

export default store;
