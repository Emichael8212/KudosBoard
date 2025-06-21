import "./card.css";
import { useParams } from "react-router-dom";
import { getComments, createComment, updateCard, updateUpvote } from "../../api";
import { useState, useEffect } from "react";

export default function Card(props) {
  const { boardId } = useParams();

  const [comments, setComments] = useState(props.comments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [upvoteNumber, setUpVoteNumber] = useState(props.upvotes);
  const handleGetComments = async (parentId, childId) => {
    try {
      const allComments = await getComments(parentId, childId);
      setComments(allComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        await handleGetComments(boardId, props.id);
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    };

    fetchComments();
  }, [boardId, props.id]); // Only re-fetch when boardId or card id changes

  const handleCloseModal = (event) => {
    setIsModalOpen(false);
    event.stopPropagation();
  };
  const [newComment, setNewComment] = useState({ author: "", comment: "" });

  const handleCommentInput = async (event) => {
    const { name, value } = event.target;
    setNewComment({ ...newComment, [name]: value });
  };
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (newComment.author && newComment.comment) {
      try {
        await createComment(newComment, boardId, props.id);
        // Refresh comments after adding a new one
        await handleGetComments(boardId, props.id);
        // Clear the form
        setNewComment({ author: "", comment: "" });
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  const handleUpvote = async (event) => {
    event.stopPropagation();
    try {
      const updatedUpvote = await updateUpvote(props.id);
      setUpVoteNumber(updatedUpvote.upvotes);
    } catch (error) {console.error("Error updating card:", error);}
      };
  return (
    <div
      className="Card"
      onClick={() => {
        handleGetComments(boardId, props.id);
        setIsModalOpen(true);
      }}
    >
      <img src={props.gifurl} alt={props.title} className="card-image" />
      <div className="card-texts">
        <div className="card-title">{props.title}</div>
        <div className="card-author">
          by {props.author}
        </div>
        <div className="card-description">{props.description}</div>
        <div>
          <button onClick={handleUpvote}>
            {upvoteNumber} Upvote
          </button>
          &nbsp;&nbsp;
          <span>{props.comments?.length} Comments</span>
        </div>
        <div className="card-btns">
          <div
            className="add-view-comments"
            onClick={(event) => {
              handleGetComments(boardId, props.id);
              setIsModalOpen(true);
              event.stopPropagation();
            }}
          >
            Add/View Comment
          </div>

          <div onClick={props.onDelete} className="delete-card">
            Delete Card
          </div>
        </div>
      </div>
      <div
        className="card-details-modal-overlay"
        style={{ display: isModalOpen ? "block" : "none" }}
        onClick={(event) => handleCloseModal(event)}
      >
        <div
          className="card-details-modal"
          onClick={(event) => event.stopPropagation()}
        >
          <div
            onClick={(event) => handleCloseModal(event)}
            className="close-card-details close-modal-btn"
          >
            &times;
          </div>
          <div className="card-details-top">
            <img
              src={props.gifurl}
              alt={props.title}
              className="card-details-image"
              width="200px"
            />
            <div>
              <div>{props.title}</div>
              <div className="card-author">
                by {props.author} on&nbsp;
                <span className="card-time">
                  {new Date(props.createdAt).toLocaleString()}
                </span>
              </div>

              <div>{props.upvotes} upvotes</div>
            </div>
          </div>
          <div>
            Comments
            {Array.isArray(comments) && comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index}>
                  <div>{comment.comment}</div>
                </div>
              ))
            ) : (
              <div>No comments yet</div>
            )}
            Author
            <input
              name="author"
              type="text"
              value={newComment.author}
              onChange={handleCommentInput}
              placeholder="Type Comment"
            />
            Add Comment
            <input
              name="comment"
              type="text"
              value={newComment.comment}
              onChange={handleCommentInput}
              placeholder="Type Comment"
            />
            <div onClick={handleCommentSubmit}>Submit</div>
          </div>
        </div>
      </div>
    </div>
  );
}
