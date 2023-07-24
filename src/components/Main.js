import { useContext } from "react";

import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  selectedCard,
  onZoom,
  onDelete,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content container">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар профиля"
          />

          <button
            type="button"
            className="profile__avatar-edit-btn"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-btn"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-btn"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              likes={card.likes}
              link={card.link}
              name={card.name}
              selectedCard={selectedCard}
              onZoom={onZoom}
              cardOwner={card.owner._id}
              onCardLike={onCardLike}
              card={card}
              onCardDelete={onCardDelete}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
