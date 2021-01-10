const booksRouter = require("express").Router();
const Book = require("../models/books");

booksRouter.get("/", async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  if (req.query.status) {
    const statusToFind = req.query.status;
    const total = await Book.countDocuments({ status: statusToFind });
    const filtered = await Book.find({ status: statusToFind })
      .sort({ updatedOn: 1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.json({ total: total, array: filtered });
  } else {
    const filteredBooks = await Book.find({})
      .sort({ updatedOn: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(filteredBooks);
  }
});

booksRouter.get("/stats", async (req, res) => {
  const books = await Book.find({});
  const ratingReducer = books.reduce((acc, tot) => acc + tot.rating, 0);
  res.json(ratingReducer);
});

booksRouter.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  console.log(typeof book.status);
  if (book) {
    res.json(book);
  } else {
    res.status(400).end();
  }
});

booksRouter.post("/", async (req, res) => {
  const body = req.body;

  const book = new Book({
    title: body.title,
    author: body.author,
    description: body.description,
    totalPages: body.totalPages,
    genres: body.genres,
    createOn: new Date(),
  });

  const savedBook = await book.save();
  res.json(savedBook);
});

booksRouter.delete("/:id", async (req, res) => {
  await Book.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

booksRouter.put("/:id", async (req, res) => {
  const body = req.body;

  const book = {
    title: book.title,
    author: book.author,
    description: book.description,
    totalPages: book.totalPages,
    pagesRead: book.pagesRead,
    genres: book.genres,
    updatedOn: new Date(),
    rating: book.rating,
    review: book.review,
  };

  const updatedBook = await Book.findByIdAndUpdate(req.params.id, book, {
    new: true,
  });
  res.json(updatedBook);
});

booksRouter.put("/:id", async (req, res) => {
  const body = req.body;

  const book = await Book.findById(req.params.id);

  if (book) {
    const bookToUpdate = {
      pagesRead: body.pagesRead ? body.pagesRead : book.pagesRead,
      rating: body.rating ? body.rating : book.rating,
      review: body.review ? body.review : book.review,
    };

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      bookToUpdate,
      { new: true }
    );
    res.json(updatedBook);
  } else {
    res.status(404).json({ error: "resource doesn't exist" });
  }
});

module.exports = booksRouter;
