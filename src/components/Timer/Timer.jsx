import React, { useState, useEffect } from "react";

import "./Timer.scss";

export default function Timer(props) {
  const { totalSeconds = 5, onComplete = () => {} } = props;

  const [seconds, setState] = useState(0);

  useEffect(() => {
    const start = Date.now();

    function loop() {
      const seconds = Math.round((Date.now() - start) / 1000);
      setState(state => (state !== seconds ? seconds : state));

      if (seconds < totalSeconds) {
        window.requestAnimationFrame(loop);
      } else {
        onComplete();
      }
    }

    loop();
  }, []);

  return (
    <div className="timer">
      <div className="bar" />
      <div
        className="fill"
        style={{
          width: `${seconds * Math.round(100 / totalSeconds)}%`
        }}
      />
    </div>
  );
}
