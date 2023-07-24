import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onUpdateImage }) {
  const [link, setLink] = useState("");
  const [name, setName] = useState("");

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleSubmit() {
    onUpdateImage({
      name,
      link,
    });
  }

  function handleReset() {
    setLink("");
    setName("");
  }

  useEffect(() => {
    if (isOpen) {
      handleReset();
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name={"card"}
      title={"Новое место"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Создать"}
      disabled={!name || !link}
    >
      <fieldset className="form__input-container">
        <input
          onChange={handleChangeName}
          className="form__item form__item-type-place"
          id="place"
          name="name"
          type="text"
          placeholder="Название"
          required
          minLength={2}
          maxLength={30}
          value={name}
        />
        <span
          className="form__item-error form__item-type-place-error"
          id="place-error"
        ></span>

        <input
          onChange={handleChangeLink}
          className="form__item form__item-type-link"
          id="link"
          name="link"
          type="url"
          placeholder="Ссылка на картинку"
          required
          value={link}
        />
        <span
          className="form__item-error form__item-link-error"
          id="link-error"
        ></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
