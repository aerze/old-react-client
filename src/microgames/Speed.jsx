import React, { useState } from "react";
import { Container } from "reactstrap";

import "./Speed.scss";
import Timer from "../components/Timer/Timer";
import get from "lodash/get";
import { Redirect, useHistory } from "react-router";
import { playerReportStore } from "../io";

export default function Speed(props) {
  const history = useHistory();
  const [state, setState] = useState({
    pressed: false,
    counter: 0,
    timesUp: false
  });

  const mergeState = update => setState(state => ({ ...state, ...update }));

  const handleClick = () => {
    setState(state => ({ ...state, counter: state.counter + 1 }));
  };

  const handlePress = () => {
    mergeState({ pressed: true });
  };

  const handleRelease = () => {
    mergeState({ pressed: false });
  };

  const handleComplete = () => {
    setState(state => {
      console.log(props.state.game.id, props.state.player.id, state.counter);
      playerReportStore(
        props.state.game.id,
        props.state.player.id,
        state.counter
      );

      return { ...state, timesUp: true };
    });
    mergeState({ timesUp: true });
    // history.push(`/scoreboard/${props.state.game.id}`);
  };

  if (!get(props.state, "game.id", "")) {
    return <Redirect to="/" />;
  }

  if (get(props.state, "game.state", "") === "SCORE") {
    playerReportStore(
      props.state.game.id,
      props.state.player.id,
      state.counter
    );
    return <Redirect to={`/scoreboard/${props.state.game.id}`} />;
  }

  return (
    <div className="speed">
      <Container>
        <div className="container">
          <h1 className="display-2">
            {state.counter > 0 ? state.counter : "CLICK IT!"}
          </h1>
          <div
            className="game-button"
            style={{
              transform: `translateY(${state.pressed ? "30" : "0"}px)`,
              boxShadow: state.pressed
                ? "0px 15px 0px 0px black"
                : "0px 45px 0px 0px black"
            }}
            onTouchStartCapture={handlePress}
            onMouseDownCapture={handlePress}
            onTouchEndCapture={handleRelease}
            onMouseUpCapture={handleRelease}
            onClick={state.timesUp ? undefined : handleClick}
          />
        </div>
        {!state.timesUp && (
          <Timer totalSeconds={5} onComplete={handleComplete} />
        )}
      </Container>
    </div>
  );
}
