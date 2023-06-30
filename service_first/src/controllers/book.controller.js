const Book = require("../modal/book.modal");

module.exports.getAllBook = async (req, res) => {
  res.status(200).json({
    title: "test",
  });
  // try {
  //   const books = await Book.find();
  //   res.status(200).json(books);
  // } catch (error) {
  //   res
  //     .status(500)
  //     .json({ error: "An error occurred while creating the book" });
  // }
};

module.exports.createBook = async (req, res) => {
  const { title, description } = req.body;
  const newBook = new Book();
  newBook.title = title;
  newBook.description = description;

  try {
    const result = await newBook.save();
    res
      .status(201)
      .json({ message: "Book created successfully", book: result });
  } catch (error) {
    console.error("Error creating book:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the book" });
  }
};

module.exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the book" });
  }
};

module.exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  const deletedBook = await Book.findByIdAndDelete(id);
  try {
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the book" });
  }
};
