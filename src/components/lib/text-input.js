import { useRef } from "react";
import styled from "@emotion/styled";
import { useTextField } from "@react-aria/textfield";

function TextInput(props) {
  let { label } = props;
  let ref = useRef();
  let { labelProps, inputProps } = useTextField(props, ref);

  return (
    <Container
      style={{ display: "flex", flexDirection: "column", ...props.style }}
    >
      <Label {...labelProps}>{label}</Label>
      <Input {...inputProps} ref={ref} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flexdirection: column;
`;
const Label = styled.label``;
const Input = styled.input``;

export default TextInput;
