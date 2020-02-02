import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./views/Home/Home";
import CreateGame from "./views/CreateGame";
import JoinGame from "./views/JoinGame";
import Lobby from "./views/Lobby";
import Scoreboard from "./views/Scoreboard";
import Speed from "./microgames/Speed";
import Accuracy from "./microgames/Accuracy";
import Random from "./microgames/Random";
import { connect } from "./io";
import Dev from "./components/Dev/Dev";

const initialState = {
  connected: false,
  game: null,
  player: null,
  // host controls
  lobbyIsReady: false
};

export default function App() {
  const [state, setState] = useState(initialState);
  const mergeState = update => setState(state => ({ ...state, ...update }));
  const stateProps = { state, mergeState };

  useEffect(() => {
    connect(mergeState);
  }, []);

  return (
    <BrowserRouter>
      <Dev {...stateProps} />
      <Switch>
        <Route exact path="/">
          <Home {...stateProps} />
        </Route>
        <Route exact path="/create-game">
          <CreateGame {...stateProps} />
        </Route>
        <Route exact path="/join-game/:gameId">
          <JoinGame {...stateProps} />
        </Route>
        <Route exact path="/lobby/:gameId">
          <Lobby {...stateProps} />
        </Route>
        <Route exact path="/scoreboard/:gameId">
          <Scoreboard {...stateProps} />
        </Route>
        <Route exact path="/microgame/accuracy">
          <Accuracy {...stateProps} />
        </Route>
        <Route exact path="/microgame/random">
          <Random {...stateProps} />
        </Route>
        <Route exact path="/microgame/speed">
          <Speed {...stateProps} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}
