import { configureStore } from '@reduxjs/toolkit';
import projectManagementReducer from './slices/mainSlice';

const store = configureStore({
    reducer: {
        projectManagement: projectManagementReducer,
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
