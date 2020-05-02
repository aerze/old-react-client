import {
  GAME_CREATED,
  GAME_JOINED,
  PLAYER_JOINED,
  PLAYER_IS_READY,
  SET_PLAYER_SCORE,
  MOVE_TO_SCOREBOARD,
  MOVE_TO_GAME,
  MOVE_TO_RESULTS
} from "./game.reducer";

export function handleGameCreated(payload) {
  return {
    type: GAME_CREATED,
    payload
  };
}

export function handleGameJoined(payload) {
  return {
    type: GAME_JOINED,
    payload
  };
}

export function handlePlayerJoined(payload) {
  return {
    type: PLAYER_JOINED,
    payload
  };
}

export function handlePlayerIsReady(payload) {
  return {
    type: PLAYER_IS_READY,
    payload
  };
}

export function handleSetPlayerScore(payload) {
  return {
    type: SET_PLAYER_SCORE,
    payload
  };
}

export function handleMoveToScoreboard(payload) {
  return {
    type: MOVE_TO_SCOREBOARD,
    payload
  };
}

export function handleMoveToGame(payload) {
  return {
    type: MOVE_TO_GAME,
    payload
  };
}

export function handleMoveToResults(payload) {
  return {
    type: MOVE_TO_RESULTS,
    payload
  };
}
