import {Provider} from "react-redux";

import movieReducer from "./store/reducer";
import Root from "./components/root.react-component";
import configureStore from "./store/root-store";
import {combineReducers} from "redux";

const createStore = (pageState, reducerMap = {}) => {
    const initialState = {};
    let appConfig = {};

    const defaultReducers = {
        movies: movieReducer,
        ...reducerMap,
    };

    return configureStore(initialState, appConfig, combineReducers(defaultReducers));
};

function App() {
    return (
        <Provider store={createStore(null, null)}>
            <Root />
        </Provider>
    );
}

export default App;
