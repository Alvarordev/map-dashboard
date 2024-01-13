import { configureStore } from "@reduxjs/toolkit";
import { authReducer, initializeAuthAsync } from "./slices/auth.slice";
import { multaReducer } from "./slices/multa.slice";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { cepoReducer } from "./slices/cepo.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    multa: multaReducer,
    cepo: cepoReducer
  },
});

store.dispatch(initializeAuthAsync())

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
