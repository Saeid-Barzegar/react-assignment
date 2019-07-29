import React from 'react';
import ReactDom from "react-dom";
import App from "./App";

import './assets/style/main.scss';
import 'es6-promise/auto'
import 'isomorphic-fetch'

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from './store/reducers/index'
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const Store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))

ReactDom.render(
    <Provider store={Store}>
        <App />
    </Provider>
    , document.getElementById('App'))