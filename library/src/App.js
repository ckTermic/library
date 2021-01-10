import React from "react";
import { Switch, Route } from "react-router-dom";
import { Navigation } from "./components/Navbar";
import { Home } from "./components/Home";
import { BookComponent } from "./components/bookComponents/BookComponent";
import { Login } from "./components/Login";
import { SingleBookComponent } from "./components/bookComponents/SingleBookComponent";

export const App = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route exact path="/books/:id">
          <SingleBookComponent />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/books">
          <BookComponent />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};
