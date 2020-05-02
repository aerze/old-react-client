export default function mapDispatchToActions(dispatch, actions) {
  return Object.entries(actions).reduce(
    (dispatchActions, [key, actionCreator]) => (
      (dispatchActions[key] = (...args) => {
        const action = actionCreator(...args);
        console.groupCollapsed(`ACTION: ${action.type}`);
        console.log(`CREATOR: ${key}`);
        console.log(`PAYLOAD:`, action.payload);
        console.groupEnd();
        return dispatch(action);
      }),
      dispatchActions
    ),
    {}
  );
}

// export default function mapDispatchToActions(d, as) {
//   return Object.entries(as).reduce(
//     (das, [k, v]) => ((das[k] = (...a) => d(v(...a))), das),
//     {}
//   );
// }
