import React, { useEffect } from "react";
import io from "socket.io-client";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { animated, useTransition } from "react-spring";

import Home from "./views/Home/Home";
import CreateGame from "./views/CreateGame";
import { SocketDebug } from "./components/SocketDebug";
import { useSocketContext } from "./stores/socket/socket.context";
import { useGameContext } from "./stores/game/game.context";
import {
  GAME_CREATED,
  GAME_JOINED,
  PLAYER_JOINED,
  PLAYER_IS_READY,
  SET_PLAYER_SCORE,
  MOVE_TO_SCOREBOARD,
  MOVE_TO_GAME,
  MOVE_TO_RESULTS
} from "./stores/game/game.reducer";

const SERVER_ADDRESS = "localhost:8080";

export default function App() {
  const [socketState, socketActions] = useSocketContext();
  const [gameState, gameActions] = useGameContext();
  const location = useLocation();
  const transitions = useTransition(location, location => location.pathname, {
    clamp: true,
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  useEffect(() => {
    const socket = io(SERVER_ADDRESS, { autoConnect: false });
    socketActions.socketInitialize(socket);

    socket.on("connect", socketActions.socketConnected);
    socket.on("disconnect", socketActions.socketDisconnected);

    socket.on(GAME_CREATED, gameActions.handleGameCreated);
    socket.on(GAME_JOINED, gameActions.handleGameJoined);
    socket.on(PLAYER_JOINED, gameActions.handlePlayerJoined);
    socket.on(PLAYER_IS_READY, gameActions.handlePlayerIsReady);
    socket.on(SET_PLAYER_SCORE, gameActions.handleSetPlayerScore);
    socket.on(MOVE_TO_SCOREBOARD, gameActions.handleMoveToScoreboard);
    socket.on(MOVE_TO_GAME, gameActions.handleMoveToGame);
    socket.on(MOVE_TO_RESULTS, gameActions.handleMoveToResults);

    socket.open();
  }, []);

  return (
    <>
      <SocketDebug />
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props} className="screen">
          <Switch location={item}>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/create-game">
              <CreateGame />
            </Route>

            <Redirect to="/" />
          </Switch>
        </animated.div>
      ))}
    </>
  );
}
