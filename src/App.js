import React, { Component, useState, useEffect } from "react";
import MainPage from "./components/MainPage";
import GateSelector from "./components/GateSelector";
import WaitRoom from "./components/WaitRoom";
import { CssBaseline } from "@material-ui/core";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import db from "./lambda/lib/firebase";

class LambdaDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, msg: null };
  }

  handleClick = () => e => {
    e.preventDefault();

    this.setState({ loading: true });
    fetch("/.netlify/functions/api/game")
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }));
  };

  render() {
    const { loading, msg } = this.state;

    return (
      <p>
        <button onClick={this.handleClick()}>
          {loading ? "Loading..." : "Call Lambda"}
        </button>
        <br />
        <span>{msg}</span>
      </p>
    );
  }
}

function App(props) {
  const [gate, setGate] = useState("-");
  const [gameState, setGameStateVar] = useState(false);

  useEffect(() => {
    const gameStateRef = db.ref("gameState");
    gameStateRef.on("value", snapshot => {
      const val = snapshot.val();
      console.log(val);
      setGameStateVar(val);
    });
  }, []);

  return (
    <Router>
      <CssBaseline />
      <Switch>
        <Route path="/gateselection">
          <GateSelector setGate={setGate} />
        </Route>
        <Route path="/waitingroom">
          <WaitRoom gate={gate} gameState={gameState} />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
