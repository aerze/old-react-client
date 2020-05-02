import React from "react";
import { useSocketReducer } from "./socket.reducer";

export const SocketContext = React.createContext(null);
export const SocketProvider = props => {
  const value = useSocketReducer();
  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => React.useContext(SocketContext);
