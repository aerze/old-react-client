import makeStoreHook from "../makeStoreHook";
import InvalidAction from "../InvalidAction";

import * as socketActions from "./socket.actions";

export const initialState = {
  socket: null,
  connected: false
};

export const SOCKET_INITIALIZED = "SOCKET_INITIALIZED";
export const SOCKET_CONNECTED = "SOCKET_CONNECTED";
export const SOCKET_DISCONNECTED = "SOCKET_DISCONNECTED";

export function socketReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SOCKET_INITIALIZED:
      return {
        ...state,
        socket: payload.socket
      };

    case SOCKET_CONNECTED:
      return {
        ...state,
        connected: true
      };

    case SOCKET_DISCONNECTED:
      return {
        ...state,
        connected: false
      };

    default:
      return new InvalidAction();
  }
}

export const useSocketReducer = makeStoreHook(
  initialState,
  socketReducer,
  socketActions
);
