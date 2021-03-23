import "react-app-polyfill/ie9"; // For IE 9-11 support
import "react-app-polyfill/ie11"; // For IE 11 support
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ApolloClient from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";

//for notification
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import "video-react/dist/video-react.css";





ReactDOM.render(
  <React.Fragment>
    <App />
    <ReactNotification />
  </React.Fragment>
  , document.getElementById('root'));


