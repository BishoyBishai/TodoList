import React from "react";
import { LazyImage } from "./../LazyImage";
import "./TodoModal.css";


/**
 * Modal Component to display more data about the todo
 */

export  function TodoModal({ todo, show, onClose }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const closeModal = () => {
    onClose();
  };

  if (!todo) return "";
  return (
    <div className={showHideClassName}>
      <div className="modal-wrapper" onClick={closeModal}></div>
      <div className="modal-box">
        <div className="modal-header">
          <div className="close-modal" onClick={closeModal}>
            &#10006;
          </div>
          <h1>{todo.login.username}</h1>
        </div>
        <div className="modal-body">
          <LazyImage src={todo.picture.large} alt={todo.picture.large} />
        </div>
      </div>
    </div>
  );
}
