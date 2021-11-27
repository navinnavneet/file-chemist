// Redux
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {createWrapper} from 'next-redux-wrapper';

import AppReducer from "./appSlice";

function makeStore() {
    return configureStore({	
        reducer: {
            app: AppReducer
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        }),
    });
}

export const rootReducer = combineReducers({
	app: AppReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore);