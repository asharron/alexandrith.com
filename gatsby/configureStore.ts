import {configureStore} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import editorSlice from "./src/store/editorSlice";

const store = configureStore({
    reducer: {
        editor: editorSlice.reducer
    }
});

export default store;

export type ReduxState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;
export const useReduxDispatch = () => useDispatch<ReduxDispatch>();