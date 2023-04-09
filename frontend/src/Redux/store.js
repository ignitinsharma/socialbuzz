import { legacy_createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { mainReducer } from "./reducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

/*  For redux persist we are using for storing our state in local storage
    if we reload our web page data will never lost ... 
    it gonns store locally in local storage...
*/
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, mainReducer);
export const store = legacy_createStore(
  persistedReducer,
  applyMiddleware(thunk)
);
export const persistor = persistStore(store);
