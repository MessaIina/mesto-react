import React from "react";

function ImagePopup({ src, alt, isOpen, onClose }) {
  return (
    <div className={`popup image-popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container-image">
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
        ></button>
        <div className="card-zoom">
          <img className="card-zoom__image" src={src} alt={alt} />
          <h2 className="card-zoom__caption">{alt}</h2>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
