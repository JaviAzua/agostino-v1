import React from "react";
import "./close-button-styles.css";

const CloseButton = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <button
      onClick={() => setIsOpen(false)}
      aria-label="Close menu"
      className="close-btn"
      type="button"
    >
      <span className="text px-2">X</span>
      <span className="thanks">Close</span>
    </button>
  );
};

export default CloseButton;
