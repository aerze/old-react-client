import { useReducer } from "react";
import mapDispatchToActions from "./mapDispatchToActions";

export default function makeStoreHook(initialState, reducer, actions) {
  return () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const dispatchActions = mapDispatchToActions(dispatch, actions);
    return [state, dispatchActions, dispatch];
  };
}
