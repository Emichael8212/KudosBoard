
import { useState } from "react";
import "./Board.css";

export default function Board(props) {
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  return (
    <div className="Board" onClick={props.onBoardClick}>
      <img src="https://picsum.photos/200/300" alt="kudos board" className="board-image" />

      <div className="board-texts-container">
        <div className="board-title">{props.title}</div>
        <div className="board-2nd-texts-container">
          <div>
            <div className="board-category">{props.category}</div>
            <div className="board-author">
              by {props.author} at{" "}
              <span className="board-createdAt">

              </span>
            </div>
          </div>
          <div className="board-btn-container">
            <div
              className="board-btn board-btn-view"
              onClick={(event) => {
                props.onBoardClick();
                event.stopPropagation();
              }}
            >View Board</div>
            <div
              className="board-btn board-btn-delete"
              onClick={(event) => {
                setIsDeleteClicked(true), event.stopPropagation();
              }}
            >
              Delete</div>

          </div>
        </div>
      </div>

      <div
        className="delete-confirmation-modal-overlay"
        style={{ display: isDeleteClicked ? "block" : "none" }}
        onClick={() => setIsDeleteClicked(false)}
      >
        <div
          className="delete-confirmation-modal"
          onClick={(event) => event.stopPropagation()}
        >
          <div
            className="close-modal-btn"
            onClick={() => setIsDeleteClicked(false)}
          >
            &times;
          </div>
          <div className="delete-confirmation-first-line">
            You are about to delete a kudos board
          </div>
          <div className="delete-confirmation-second-line">
            You cannot undo this action
          </div>
          <div className="delete-confirmation-third-line">Continue?</div>
          <div className="delete-confirmation-btns">
            <div
              onClick={() => {
                props.onBoardDelete(), setIsDeleteClicked(false);
              }}
            >
              Yes, please
            </div>
            <div onClick={() => setIsDeleteClicked(false)}>No, thank you</div>
          </div>
        </div>
      </div>
    </div>
  );
}
