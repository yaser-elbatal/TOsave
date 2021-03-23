import React, { Component } from "react";
import { Redirect, HashRouter, Route, Switch } from "react-router-dom";

// import { renderRoutes } from 'react-router-config';
import "./App.scss";
import Loader from "./views/Components/Custom/Loader/Loader";
import * as serviceWorker from "./serviceWorker";
import ApolloClient from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";

//for notification
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const loading = () => (
  <div style={{ position: "fixed", top: "50%", left: "45%" }}>
    <Loader />
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./login/login"));
const Register = React.lazy(() => import("./views/Pages/Register"));
const Page404 = React.lazy(() => import("./views/Pages/Page404"));
const Page500 = React.lazy(() => import("./views/Pages/Page500"));

const PrivateRoute = ({ ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("sacoAdmin") &&
        localStorage.getItem("sacoAdmin") != "null" ? (
          (() => {
            const client = new ApolloClient({
              link: new WebSocketLink({
                uri: "ws://tosafe.trendsgcc.com/v1/graphql",
                options: {
                  reconnect: true,
                  connectionParams: {
                    headers: {
                      // 'x-hasura-admin-secret': 'saco@2019',
                      Authorization: `Bearer ${
                        (localStorage.getItem("sacoAdmin") &&
                          JSON.parse(localStorage.getItem("sacoAdmin")).token) ||
                        ""
                        }`,
                    },
                  },
                },
              }),
              cache: new InMemoryCache(),
            });

            console.log({
              Authorization: `Bearer ${
                (localStorage.getItem("sacoAdmin") &&
                  JSON.parse(localStorage.getItem("sacoAdmin")).token) ||
                ""
                }`,
            });

            return (
              <ApolloProvider client={client}>
                <ReactNotification />
                <DefaultLayout {...props} />
              </ApolloProvider>
            );
          })()
        ) : (
          <Redirect to="/login" />
        )
    }
  />
);
class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            {/* <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} /> */}
            <Route
              exactxx
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            {/* <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} /> */}
            <PrivateRoute path="/" name="Home" />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}
serviceWorker.unregister();

export default App;
