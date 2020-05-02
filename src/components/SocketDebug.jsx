import React from "react";
import { animated, useTransition } from "react-spring";
import { useSocketContext } from "../stores/socket/socket.context";

export function SocketDebug() {
  const [socketState] = useSocketContext();
  const socketDisconnected = !socketState.connected;
  const transitions = useTransition(socketDisconnected, null, {
    clamp: true,
    from: { position: "absolute", opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div key={key} style={props} className="socket-debug">
          SOCKET DISCONNECTED
        </animated.div>
      )
  );
}
