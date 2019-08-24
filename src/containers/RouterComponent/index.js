/**
 *
 * A router Component that will handle the routing  based on the router.json
 */

import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import PrivateRoute from "../../Common/PrivateRoute";
import Templates from "../../Services/Templates";
import ProtectRoute from "../../Common/protectRoute";
import WrappedRouter from "../../Common/HOC/WrappedRouter";
import { withRouter } from "react-router-dom";

class RouterComponent extends Component {
  state = {
    routes: []
  };
  componentDidMount() {
    this.setState({ routes: this.props.routes });
  }

  render() {
    return (
      <div className="app-container">
        <Switch>
          {this.state.routes.map((entry, key) => {
            switch (entry.typeRoute) {
              case "protect":
                return (
                  <ProtectRoute
                    key={key}
                    path={entry.path}
                    exact={entry.exact}
                    component={entry.component}
                  />
                );
              case "private":
                return (
                  <PrivateRoute
                    key={key}
                    path={entry.path}
                    exact={entry.exact}
                    component={entry.component}
                  />
                );
              default:
                return (
                  <Route
                    key={key}
                    path={entry.path}
                    exact={entry.exact}
                    render={props => {
                      const Template = Templates()[entry.component];
                      return <Template {...props} />;
                    }}
                  />
                );
            }
          })}
        </Switch>
      </div>
    );
  }
}

export default WrappedRouter(
  withRouter(withNamespaces("translation")(RouterComponent))
);
