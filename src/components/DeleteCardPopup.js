import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onDelete }) {
  return (
    <PopupWithForm
      onSubmit={onDelete}
      title={"Вы уверены?"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Да"}
      containerType={"form_delete"}
    ></PopupWithForm>
  );
}

export default DeleteCardPopup;
