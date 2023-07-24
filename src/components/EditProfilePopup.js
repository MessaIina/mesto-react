import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit() {
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name={"profile"}
      title={"Редактировать профиль"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Сохранить"}
    >
      <input
        className="form__item form__item-type-name"
        id="name"
        name="name"
        type="text"
        placeholder="Имя"
        required
        value={name || ""}
        onChange={handleChangeName}
      />
      <span
        className="form__item-error form__item-type-name-error"
        id="name-error"
      ></span>
      <input
        className="form__item form__item-type-job"
        id="about"
        name="about"
        type="text"
        placeholder="О себе"
        required
        value={description || ""}
        onChange={handleChangeDescription}
      />
      <span
        className="form__item-error form__item-type-job-error"
        id="about-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
