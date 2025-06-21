import axios from "axios";



export const getBoards = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/boards`);
    return response.data;
  } catch (error) {
    console.error("Error fetching boards", error);
  }
};

export const createBoards = async (boardData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/boards`, boardData);
    return response.data;
  } catch (error) {
    console.error("Error fetching boards", error);
    throw error;
  }
};

export const deleteBoard = async (boardId) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/boards/${boardId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching boards", error);
  }
};

export const getCards = async (boardId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/boards/${boardId}/cards`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cards", error);
    throw error;
  }
};

export const createCards = async (cardData, boardId) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/boards/${boardId}/cards`,
      cardData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching boards", error);
    throw error;
  }
};

export const updateCard = async (cardData, boardId, cardId) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/boards/${boardId}/cards/${cardId}`,
      cardData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCard = async (boardId, cardId) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/boards/${boardId}/cards/${cardId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching boards", error);
  }
};


export const updateUpvote = async (cardId) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/cards/${cardId}/upvote`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getComments = async (boardId, cardId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/boards/${boardId}/cards/${cardId}/comments`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cards", error);
    throw error;
  }
};

export const createComment = async (commentData, boardId, cardId) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/boards/${boardId}/cards/${cardId}/comments`,
      commentData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching boards", error);
    throw error;
  }
};
