import React from "react";
import { useGameReducer } from "./game.reducer";

export const GameContext = React.createContext(null);
export const GameProvider = props => {
  const value = useGameReducer();
  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
};

export const useGameContext = () => React.useContext(GameContext);
