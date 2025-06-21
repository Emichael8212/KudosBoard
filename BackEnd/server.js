const { PrismaClient } = require('./prisma/generated/prisma-client')
const prisma = new PrismaClient()

const cors = require('cors');

const express = require('express')
const app = express()
app.use(cors());

app.use(express.json())
// for boards
// get all boards

app.get('/boards', async (req, res) => {
    try {
        const response = await prisma.board.findMany({
        include: {
            cards: {
                include: {
                    comments: true
                }
            }
        }
        })
        res.json(response);
            }

    catch (error) {
        res.status(500).json(error.message)
    }
})

// get specific board
app.get('/boards/:boardId', async (req, res) => {
    try {
            const boardId = parseInt(req.params.boardId)
            const specific_board = await prisma.board.findUnique({
                where:  {
                    id: boardId
                },
                include: {
                    cards: {
                        include: {
                            comments: true
                        }
                    }
                }
            });
                res.status(200).json(specific_board);
    }   catch (error) {
        res.status(500).json(error.message)
    }

})

// creating a board
app.post('/boards', async (req, res) => {
    const {title, image, category, author, cards} = req.body;
    const newBoard = await prisma.board.create({
        data: {
        title,
        image,
        category,
        author,
        cards
    }})
    res.json(newBoard)
})

// updating a board
app.put('/boards/:boardId', async(req, res) => {
    const {boardId} = req.params
    const {image, title, category, cards} = req.body
    const updatedBoard = await prisma.board.update({
        where: {
            id: parseInt(boardId),
        },
        data: {image, title, category, cards},
    })
    res.status(200).json(updatedBoard)
})

// delete board
app.delete('/boards/:boardId', async (req, res) => {
  try {
    const boardId = parseInt(req.params.boardId);
    const deletedBoard = await prisma.board.delete({
      where: { id: boardId }
    });
    res.json(deletedBoard);
  } catch (error) {
    res.status(500).json(error.message);
  }
});




// // for cards
// // get all cards
app.get('/boards/:boardId/cards', async (req, res) => {
    const {boardId} = req.params
    const response = await prisma.card.findMany({
        where: {
            boardId: parseInt(boardId)
        },
        include: {
            comments: true
        }
    })
    res.status(200).json(response)
})

// get unique card
app.get('/boards/:boardId/cards/:cardId', async (req, res) => {
    const {boardId, cardId} = req.params;
    const response = await prisma.card.findUnique({
        where:{
            boardId: parseInt(boardId),
            cardId: parseInt(cardId)
        },
            include: {
            comments: true},

    })
    res.json(response)
})

// create new card
app.post('/boards/:boardId/cards', async(req, res) => {
    try {
        const boardId = req.params.boardId
        const {author, title, description, gifurl}  = req.body
        const createdCard = await prisma.card.create({
            data: {
                author,
                title,
                description,
                gifurl,
                boardId: parseInt(boardId)
            },
        })
        res.json(createdCard)
    }

    catch (error) {
        res.status(500).json(error.message)

    }
})

// update card
app.put('/boards/:boardId/cards/:cardId', async (req, res) => {
    const boardId = req.params.boardId
    const cardId = req.params.cardId
    const {author, title, description, image}  = req.body
    const updatedCard = await prisma.card.update({
        where: {
            id: parseInt(cardId)
        },
        data: {
            author,
            title,
            upvotes,
            description,
            image,
            boardId: parseInt(boardId)
        }
    })
    res.json(updatedCard)
})

// delete card
app.delete('/boards/:boardId/cards/:cardId', async(req, res) => {
    const {boardId, cardId} = req.params
    const deletedCard = await prisma.card.delete({
        where: {
            id: parseInt(cardId)
        }
    })
    res.json(deletedCard)
})

// get Comments
app.get('/boards/:boardId/cards/:cardId/comments/:commentId', async (req, res) => {
    const {cardId, commentId} = req.params;
    const comment = await prisma.comment.findUnique({
        where:{
            boardId: parseInt(commentId),
            cardId: parseInt(cardId)
        },
    })
    res.status(200).json(comment)
})

// create comments
app.post('/boards/:boardId/cards/:cardId/comments', async (req, res) => {
    const {cardId} = req.params;
    const {author, comment} = req.body
    const createComment = await prisma.comment.create({
        data:   {
            author,
            comment,
            cardId: parseInt(cardId, 10)
        },
    })
    res.status(200).json(createComment)
})

//update Comment
app.put('/boards/:boardId/cards/:cardId/comments/:commentId', async (req, res) => {
    const {cardId, commentId} = req.params;
    const {comment} = req.body
    const updateComment = await prisma.comment.update({
        where: {
            commentId: parseInt(commentId),
        },
        data:   {
            comment,
            cardId: parseInt(cardId)
        },
    });
    res.status(200).json(updateComment);
});

// delete comment
app.delete('/boards/:boardId/cards/:cardId/comments/:commentId', async (req, res) => {
    const cardId = req.params.cardId;
    const {commentId} = req.params.commentId;
    const deleteComment = await prisma.comment.delete({
        where: {
            commentId: parseInt(commentId),
        },
    });
    res.status(200).json(deleteComment);
});


app.put('/cards/:cardId/upvote', async (req, res) => {
    const {cardId} = req.params;
    const createUpvotes = await prisma.card.update({
        where: {id: parseInt(cardId)
        },
        data:   {
            upvotes: {increment: 1}
        }
    })
    res.status(200).json(createUpvotes)
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server lisened to PORT: ${PORT}`)
})
