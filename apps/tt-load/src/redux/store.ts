import { configureStore } from '@reduxjs/toolkit';
import timetrackReducer from './slices/timetrackSlice';

const store = configureStore({
    reducer: {
        timetrack: timetrackReducer,
    },
    devTools: {
        serialize: true,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
