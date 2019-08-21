import React from "react";
import ReactDOM from "react-dom";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import initializeStore from "../src/store/initializeStore";
import App from "./containers/App";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";
import registerServiceWorker from "./registerServiceWorker";

const store = initializeStore();
const trackingId = "UA-143185680-1";
const history = createBrowserHistory();
// Initialize google analytics page view tracking
ReactGA.initialize(trackingId);
history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
registerServiceWorker();
