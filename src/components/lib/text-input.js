import { useRef } from "react";
import styled from "@emotion/styled";
import { useTextField } from "@react-aria/textfield";

function TextInput(props) {
  let { label, inputFontSize, labelFontSize } = props;
  let ref = useRef();
  let { labelProps, inputProps } = useTextField(props, ref);

  return (
    <Container
      style={{ display: "flex", flexDirection: "column", ...props.style }}
    >
      <Label {...labelProps} labelFontSize={labelFontSize}>
        {label}
      </Label>
      <Input {...inputProps} inputFontSize={inputFontSize} ref={ref} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flexdirection: column;
`;
const Label = styled.label`
  margin-bottom: 16px;
  font-size: ${(props) => props.labelFontSize || props.theme.fontSizes.body};
  text-transform: uppercase;
  font-weight: bold;
`;
const Input = styled.input`
  font-size: ${(props) => props.inputFontSize || props.theme.fontSizes.body};
`;

export default TextInput;
