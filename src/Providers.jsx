import React from "react";
import { GameProvider } from "./stores/game/game.context";
import { SocketProvider } from "./stores/socket/socket.context";

export default function Providers(props) {
  return (
    <>
      <SocketProvider>
        <GameProvider>{props.children}</GameProvider>
      </SocketProvider>
    </>
  );
}
