const Product = require("../modal/product.modal");
const { v4: uuidv4 } = require("uuid");

module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the book" });
  }
};

module.exports.createProduct = async (req, res) => {
  const { title, imgSrc, unitPrice } = req.body;
  const newProduct = new Product();

  newProduct.id = uuidv4();
  newProduct.title = title;
  newProduct.imgSrc = imgSrc;
  newProduct.unitPrice = unitPrice;

  try {
    const result = await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", book: result });
  } catch (error) {
    console.error("Error creating book:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the Product" });
  }
};

module.exports.removeProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await Product.findByIdAndRemove(productId);

    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    console.error("Error removing product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while removing the product" });
  }
};
