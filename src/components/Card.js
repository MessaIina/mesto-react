import { CurrentUserContext } from "../context/CurrentUserContext.js";
import { useContext } from "react";

function Card({
  likes,
  link,
  name,
  selectedCard,
  onZoom,
  cardOwner,
  onCardLike,
  card,
  onDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = cardOwner === currentUser._id;
  const isLiked = likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-btn ${
    isLiked && "card__like-btn_liked"
  }`;

  function handleClick() {
    onZoom();
    selectedCard({ link, name });
  }

  function handleDeleteClick() {
    selectedCard(card);
    onDelete();
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="card">
      {isOwn && (
        <button
          type="button"
          className="card__delete-btn"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="card__image"
        onClick={handleClick}
        src={link}
        alt={name}
      />
      <div className="card__caption">
        <h2 className="card__name">{name}</h2>
        <div className="card__likes-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-counter">{likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
