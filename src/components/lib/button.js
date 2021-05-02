import styled from "@emotion/styled";
import { useRef } from "react";
import { useButton } from "@react-aria/button";

function Button(props) {
  let ref = useRef();
  let { buttonProps } = useButton(props, ref);
  let { children } = props;

  return (
    <Btn {...buttonProps} ref={ref} {...props}>
      {children}
    </Btn>
  );
}

const Btn = styled.button``;
export default Button;
