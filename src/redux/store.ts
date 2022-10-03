import { configureStore } from "@reduxjs/toolkit";
import projectManagementReducer from "./slices/pm";
import timetrackerReportsReducer from "./slices/tt-reports";
import humanResourcesEmployeesReducer from "./slices/hr-employees";
import humanResourcesProvidersReducer from "./slices/hr-providers";
import humanResourcesUpdatesReducer from "./slices/hr-updates";
import timetrackReducer from "./slices/timetrackSlice";

const store = configureStore({
    reducer: {
        projectManagement: projectManagementReducer,
        ttReports: timetrackerReportsReducer,
        hrEmployees: humanResourcesEmployeesReducer,
        hrProviders: humanResourcesProvidersReducer,
        hrUpdates: humanResourcesUpdatesReducer,
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
