import {
  SOCKET_CONNECTED,
  SOCKET_DISCONNECTED,
  SOCKET_INITIALIZED
} from "./socket.reducer";

export function socketInitialize(socket) {
  return {
    type: SOCKET_INITIALIZED,
    payload: { socket }
  };
}
export function socketConnected() {
  return {
    type: SOCKET_CONNECTED
  };
}

export function socketDisconnected() {
  return {
    type: SOCKET_DISCONNECTED
  };
}
