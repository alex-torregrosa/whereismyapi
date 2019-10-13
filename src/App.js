import React, { useState, useEffect } from "react";
import MainPage from "./components/MainPage";
import GateSelector from "./components/GateSelector";
import WaitRoom from "./components/WaitRoom";
import TheGame from "./components/TheGame";
import EndGame from "./components/EndGame";
import { CssBaseline } from "@material-ui/core";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import db from "./lambda/lib/firebase";
const gameStateRef = db.ref("gameState");

function App(props) {
  const [gate, setGate] = useState("-");
  const [gameState, setGameStateVar] = useState(false);
  const [points, setPoints] = useState(-1);

  useEffect(() => {
    gameStateRef.off();
    console.log("Setting gameState Listener");
    gameStateRef.on("value", snapshot => {
      const val = snapshot.val();
      if (val) {
        console.log(val);
        setGameStateVar(val);
        console.log("State set");
      }
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
        <Route path="/play">
          <TheGame gate={gate} gameState={gameState} setPoints={setPoints} />
        </Route>
        <Route path="/endgame">
          <EndGame points={points} gameState={gameState} />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
