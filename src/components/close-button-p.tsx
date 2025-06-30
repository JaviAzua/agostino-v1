import React from "react";
import "./close-button-styles.css";

const CloseButtonText = () => {
  return (
    <p
      aria-label="Cerrar dialog que contiene el video"
      className="close-btn !cursor-none"
    >
      <span className="text px-2">X</span>
      <span className="thanks">Close</span>
    </p>
  );
};

export default CloseButtonText;
