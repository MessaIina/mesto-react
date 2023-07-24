import React, { useState, useEffect } from "react";
import { api } from "../utils/Api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isZoomImagePopupOpen, setIsZoomImagePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  
  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([resultInitial, resultInformation]) => {
        setCurrentUser(resultInformation);
        setCards(resultInitial);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardDelete() {
    api
      .deleteCard(selectedCard._id)
      .then((deletedCard) => {
        const filteredCards = cards.filter((item) => {
          return selectedCard._id !== item._id;
        });

        setCards(filteredCards);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (isLiked) {
      api.dislikeCard(card._id).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
    } else {
      api.likeCard(card._id).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
    }
  }

  function handleUpdateAvatar(obj) {
    api.setUserAvatar(obj)
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleUpdateUser(obj) {
    api
      .setUserInfo(obj)
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleAddImage(obj) {
    api
      .createCard(obj)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsZoomImagePopupOpen(false);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleZoomClick() {
    setIsZoomImagePopupOpen(true);
  }

  function handleDeleteClick() {
    setIsDeletePopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          selectedCard={setSelectedCard}
          onZoom={handleZoomClick}
          onDelete={handleDeleteClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <ImagePopup
          src={selectedCard.link}
          alt={selectedCard.name}
          isOpen={isZoomImagePopupOpen}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />

<EditAvatarPopup
  onUpdateAvatar={handleUpdateAvatar}
  isOpen={isEditAvatarPopupOpen}
  onClose={closeAllPopups}
/>

        <AddPlacePopup
          onUpdateImage={handleAddImage}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />

        <DeleteCardPopup
          onDelete={handleCardDelete}
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;