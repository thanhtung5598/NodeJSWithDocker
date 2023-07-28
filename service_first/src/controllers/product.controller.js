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

    newProduct.id = uuidv4() 
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
