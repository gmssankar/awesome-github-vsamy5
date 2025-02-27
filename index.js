import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./src/components/layout/Navbar";
import Search from "./src/components/users/Search";
import Users from "./src/components/users/Users";
import User from "./src/components/users/User";

import Alert from "./src/components/layout/Alert";
import About from "./src/components/pages/About";
import Home from "./src/components/pages/Home";
import NotFound from "./src/components/pages/NotFound";

import GithubState from "./src/context/github/GithubState";
import AlertState from "./src/context/alert/AlertState";

import { render } from "react-dom";
import Hello from "./Hello";
import axios from "axios";
import "./style.css";

class App extends Component {
  async componentDidMount() {
    this.setState({ loading: true });
    const response = await axios.get("https://api.github.com/users");
    console.log("SearchUsers===>", response.data);
    this.setState({ users: response.data, loading: false });
  }
  constructor() {
    super();
    this.state = {
      name: "Awesome Github",
      users: [],
      user: {},
      repos: [],
      loading: false
    };
  }

  render() {
    const { users, user, loading, repos } = this.state;
    return (
      <GithubState>
        <AlertState>
          <Router>
            <div className="App">
              <Navbar
                icon="https://avatars1.githubusercontent.com/u/36364057?s=460&v=4"
                title="Awesome Github"
              />
              <div className="container">
                <Alert />
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={props => (
                      <Fragment>
                        <Search />
                        <Users loading={loading} users={users} />
                      </Fragment>
                    )}
                  />
                  <Route exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/user/:login" component={User} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </div>
          </Router>
        </AlertState>
      </GithubState>
    );
  }
}
render(<App />, document.getElementById("root"));
