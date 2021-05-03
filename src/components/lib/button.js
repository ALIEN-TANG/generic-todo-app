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

export default Button;
const Btn = styled.button`
  width: fit-content;
  height: fit-content;
  padding: 8px 16px;
`;
