import React from "react";
import { Input, FormFeedback } from "reactstrap";

export default function FieldInput(props) {
  const {
    input,
    placeholder,
    meta: { valid, invalid, touched }
  } = props;
  // console.log(props.meta);
  return (
    <>
      <Input
        {...input}
        placeholder={placeholder}
        valid={touched && valid}
        invalid={touched && invalid}
      />
    </>
  );
}
