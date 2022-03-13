import OutsideClickHandler from "react-outside-click-handler";
import { MdClose } from "react-icons/md";

export default function ModalTemplate({
  children,
  closeModal,
  fixed,
  title = "This is the title",
}) {
  if (!fixed) {
    return (
      <div className="modal-template-container">
        <OutsideClickHandler onOutsideClick={closeModal}>
          <div className="modal-template-box">
            <div className="modal-template-logo-container">
              <div className="modal-template-title">{title}</div>
              <MdClose
                className="modal-template-close-icon"
                onClick={closeModal}
              />
            </div>
            <div className="modal-template-content">{children}</div>
          </div>
        </OutsideClickHandler>
      </div>
    );
  }

  return (
    <div className="modal-template-container">
      <div className="modal-template-box">
        <div className="modal-template-logo-container">
          <div className="modal-template-title">{title}</div>
          <MdClose className="modal-template-close-icon" onClick={closeModal} />
        </div>
        <div className="modal-template-content">{children}</div>
      </div>
    </div>
  );
}
