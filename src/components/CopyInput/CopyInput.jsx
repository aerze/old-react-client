import React, { useState } from "react";
import copy from "copy-to-clipboard";
import { InputGroup, Input, InputGroupAddon, Button } from "reactstrap";

const noop = () => {};

export default function CopyInput(props) {
  const { text } = props;
  const [{ attempted, success }, setState] = useState({
    attempted: false,
    success: false
  });

  const handleCopyToClipboard = () => {
    const success = copy(text);
    setState({ attempted: true, success });
  };

  return (
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <Button color="secondary" onClick={handleCopyToClipboard}>
          {!attempted && "Copy"}
          {attempted && success && "Copied"}
          {attempted && !success && "Try again"}
        </Button>
      </InputGroupAddon>
      <Input value={text} onChange={noop} />
    </InputGroup>
  );
}
