import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    login: loginSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
