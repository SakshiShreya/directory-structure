import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DirectoriesScreen from "./component/directoriesScreen/DirectoriesScreen";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/*">
            <DirectoriesScreen />
          </Route>
          <Route path="/">
            <DirectoriesScreen />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
