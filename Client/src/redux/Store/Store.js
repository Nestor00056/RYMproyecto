import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "../Reducer/reducer";
import thunk from "redux-thunk";

export const Store = createStore(rootReducer, applyMiddleware(thunk));
