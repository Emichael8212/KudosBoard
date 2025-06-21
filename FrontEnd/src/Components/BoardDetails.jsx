import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BoardDetails.css";
import "./Header.css";
import "./Footer.css";
import Card from "./Card";
import { getCards } from "../../api";
import Header from "./Header";
import Footer from "./Footer";

import { createCards, deleteCard } from "../../api";

export default function BoardDetails(props) {
  const [cards, setCards] = useState([]);
  const { boardId } = useParams();

  useEffect(() => {
    const fetchCards = async (id) => {
      try {
        const data = await getCards(id);
        setCards(data);
      } catch (error) {
        throw new Error("Cards not found");
      }
    };
    boardId && fetchCards(boardId);
  }, [cards.length]);
  const initialFormData = {
    author: "",
    title: "",
    description: "",
    gifurl: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [imageSearchQuery, setImageSearchQuery] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageSearchChange = (event) => {
    const { value } = event.target;
    setImageSearchQuery(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setGifs([]);
    setSelectedGif("");

    try {
      const newCard = await createCards(formData, boardId);
      setIsModalOpen(false);
      setFormData(initialFormData);
      setCards((prev) => [...prev, newCard]);
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteCard = async (parentID, childID) => {
    try {
      await deleteCard(parentID, childID);
      setCards((prev) => prev.filter((card) => card.id !== childID));
    } catch (error) {
      throw error;
    }
  };

  const [gifs, setGifs] = useState([]);
  const [selectedGif, setSelectedGif] = useState("");

  const handleImageSearch = async () => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=0eAiXr6TvPQzxp7gvjcqvl9RuTh0NYWT&q=${imageSearchQuery}&limit=2&offset=0&rating=pg&lang=en&bundle=messaging_non_clips`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    try {
      setGifs([]);
      const response = await fetch(url, options);
      const data = await response.json();

      data.data.map((gif) => {
        setGifs((prev) => [...prev, gif.images.fixed_width.url]);
      });
    } catch (err) {
      console.error("error:" + err);
      return [];
    }
  };

  const handleSelectedGif = (gif_img) => {
    setSelectedGif(gif_img);
    formData.gifurl = gif_img;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <Header />
      <div className="board-details-header">{props.title}</div>
      <div className="board-details-nav">
        <div
          onClick={() => window.location.href = '/'}
          className="board-details-back board-btn"
        >
          Back to Boards
        </div>
        <div
          onClick={() => setIsModalOpen(true)}
          className="board-details-create board-btn"
        >
          Create New Card
        </div>
      </div>

      <div className="all-cards-container">
        {Array.isArray(cards) && cards.length > 0 ? (
          cards.map((card, index) => (
            <Card
              id={card.id}
              key={index}
              title={card.title}
              author={card.author}
              gifurl={card.gifurl}
              description={card.description}
              createdAt={card.createdAt}
              upvotes={card.upvotes}
              comments={card.comments}
              onDelete={() => handleDeleteCard(boardId, card.id)}
            />
          ))
        ) : (
          <div>"No cards found"</div>
        )}
      </div>
      <div
        className="modal-create-card-overlay"
        style={{ display: isModalOpen ? "flex" : "none" }}
        onClick={() => setIsModalOpen(false)}
      >
        <div
          className="modal-create-card-container"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="modal-create-card-header">Create New Kudos Card</div>
          <span
            className="close-modal-btn"
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </span>
          <form className="modal-create-card-form">
            <label className="modal-input-container">
              <div>Author</div>
              <input
                name="author"
                type="text"
                value={formData.author}
                placeholder="Your nickname..."
                onChange={handleInputChange}
              />
            </label>
            <label className="modal-input-container">
              <div>Title</div>
              <input
                name="title"
                type="text"
                value={formData.title}
                placeholder="Card title..."
                onChange={handleInputChange}
              />
            </label>
            <label>
              <div>Text Messag</div>
              <input
                name="description"
                type="text"
                value={formData.description}
                placeholder="Text Messag..."
                onChange={handleInputChange}
              />
            </label>
            <label>
              <div>Gif Search</div>
              <div className="gif-search-container">
                <input
                  name="gif"
                  type="text"
                  value={imageSearchQuery}
                  placeholder="Search for Image You Want..."
                  onChange={handleImageSearchChange}
                  className="image-search-input"
                />
                <div className="gif-search-buttons">
                  <div className="search-btn" onClick={handleImageSearch}>Search</div>
                  <div className="clear-btn" onClick={() => {
                    setImageSearchQuery("");
                    setGifs([]);
                  }}>Clear</div>
                </div>
              </div>
              <div className="gif-results-container">
                {gifs.map((gif, index) => (
                  <img
                    key={index}
                    src={gif}
                    alt="card gif"
                    className="gif-result-image"
                    onClick={() => handleSelectedGif(gif)}
                  />
                ))}
              </div>
              <div>Selected Gif Url</div>
              <input
                type="text"
                name="gifurl"
                value={selectedGif}
                className="selected-image-input"
                onChange={handleInputChange}

              />
            </label>
            <div className="modal-btn-submit" onClick={handleSubmit}>
              Create New Card
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
