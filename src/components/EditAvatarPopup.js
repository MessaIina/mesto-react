import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef("");

  function handleSubmit() {
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = "";
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
    >
      <input
  ref={avatarRef}
  className="form__item form__item-edit-avatar"
  id="avatar"
  name="avatar"
  type="url"
  placeholder="Ссылка на аватар"
  required
/>
      <span className="form__item-error form__item-avatar-error" id="avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;