import { createStore } from "redux";
import directoriesReducer from "./directories/directoriesReducer";

const store = createStore(directoriesReducer);

export default store;
