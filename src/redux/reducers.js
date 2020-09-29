import { combineReducers } from "redux";
import todoReducer from "./reducers/todo";
import loaderReducer from "./reducers/loader";

const rootReducer = combineReducers({
  todoData: todoReducer,
  isLoading: loaderReducer
})

export default rootReducer;