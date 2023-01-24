import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { Provider } from 'react-redux' ;
import { createStore , applyMiddleware , compose } from 'redux' ;
import thunk from 'redux-thunk' ;

import root from './redux/reducers' ;
import * as serviceWorker from "./utils/ServiceWorker";

const Store = createStore(
    root ,
    compose(
        applyMiddleware(thunk)
    )
);


ReactDOM.render(
    <Provider store={Store} >
        <App />
    </Provider>,
    document.getElementById("root")
);

serviceWorker.register() ;