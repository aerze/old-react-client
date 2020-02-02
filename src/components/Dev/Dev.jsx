import React, { useState } from "react";
import get from "lodash/get";

import "./Dev.scss";

const debug = v => JSON.stringify(v);

export function Debug(props) {
  const { value } = props;
  return (
    <pre className="debug">
      {props.children} {JSON.stringify(value, null, 2)}
    </pre>
  );
}

export default function Dev(props) {
  const { state } = props;
  const [open, setOpen] = useState(true);
  return (
    <div
      className="dev-box"
      onClick={() => setOpen(open => !open)}
      style={open ? {} : { transform: `translateX(100px)` }}
    >
      <Debug value={state}>state:</Debug>
    </div>
  );
}
