import makeStoreHook from "../makeStoreHook";
import InvalidAction from "../InvalidAction";

import * as gameActions from "./game.actions";

export const initialState = {
  game: null,
  player: null
};

export const GAME_JOINED = "GAME_JOINED";
export const GAME_CREATED = "GAME_CREATED";
export const PLAYER_JOINED = "PLAYER_JOINED";
export const PLAYER_IS_READY = "PLAYER_IS_READY";

export const SET_PLAYER_SCORE = "SET_PLAYER_SCORE";
export const MOVE_TO_SCOREBOARD = "MOVE_TO_SCOREBOARD";
export const MOVE_TO_GAME = "MOVE_TO_GAME";
export const MOVE_TO_RESULTS = "MOVE_TO_RESULTS";

export function gameReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GAME_CREATED:
    case GAME_JOINED:
    case PLAYER_JOINED:
    case PLAYER_IS_READY:
    case SET_PLAYER_SCORE:
    case MOVE_TO_SCOREBOARD:
    case MOVE_TO_GAME:
    case MOVE_TO_RESULTS:
      return {
        game: {
          ...state?.game,
          ...payload.game
        },
        player: {
          ...state?.player,
          ...payload.player
        }
      };

    default:
      return new InvalidAction();
  }
}

export const useGameReducer = makeStoreHook(
  initialState,
  gameReducer,
  gameActions
);
