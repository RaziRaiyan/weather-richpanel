import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import {forecastListReducer} from "./reducers/forecastReducer";
import {searchCityReducer} from "./reducers/searchCityReducer";

const reducer = combineReducers({
    forecastState: forecastListReducer,
    searchCityState: searchCityReducer
})

const initialState = {}

const middlewares = [thunk]

const store = createStore(
    reducer,
    initialState,
    process.env.NODE_ENV === "production"
        ? applyMiddleware(...middlewares)
        : composeWithDevTools(applyMiddleware(...middlewares))
)

export default store