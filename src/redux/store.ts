import { configureStore } from "@reduxjs/toolkit";
import projectManagementReducer from "./slices/pm";
import timetrackerReportsReducer from "./slices/tt-reports";
import humanResourcesUpdatesReducer from "./slices/hr-updates";
import humanResourcesReducer from "./slices/hr";
import timetrackReducer from "./slices/timetrackSlice";
import providersReducer from "./slices/providers";
import ticketsReducer from "./slices/tickets";

const store = configureStore({
    reducer: {
        projectManagement: projectManagementReducer,
        ttReports: timetrackerReportsReducer,
        humanResources: humanResourcesReducer,
        hrUpdates: humanResourcesUpdatesReducer,
        timetrack: timetrackReducer,
        providers: providersReducer,
        tickets: ticketsReducer,
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
