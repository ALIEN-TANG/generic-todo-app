import ReactModal from "react-modal";
import { theme } from "context/theme-provider";

ReactModal.setAppElement("#root");
ReactModal.defaultStyles.content.background = `${theme.colors.paleGreen}`;
ReactModal.defaultStyles.content.border = "none";
ReactModal.defaultStyles.content.borderRadius = `20px`;
ReactModal.defaultStyles.content.padding = "3rem";
ReactModal.defaultStyles.content.width = "720px";
ReactModal.defaultStyles.content.margin = "0 auto";

function Modal({ children, ...props }) {
  const modalStyle = props.small
    ? { content: { width: "360px", height: "180px", margin: "auto auto" } }
    : {};
  return (
    <ReactModal {...props} style={modalStyle}>
      {children}
    </ReactModal>
  );
}

export default Modal;
