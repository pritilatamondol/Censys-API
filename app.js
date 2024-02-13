const express = require("express");
const app = express();

app.use(express.json());

// Middleware to set up CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Replace '*' with the allowed origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const products = [
  { id: 1, name: "Cell Phone" },
  { id: 2, name: "Computer" },
  { id: 3, name: "Hardware" },
];

app.get("/api/products", (req, res) => {
  res.send(JSON.stringify(products));
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  console.log("products:", product);
  if (!product)
    return res.status(404).send("Product with the given ID not found.");
  res.send(product);
});

app.post("/api/product", (req, res) => {
  const product = products.find((product) => product.id == req.body.id);
  console.log(product);
  if (product)
    return res
      .status(400)
      .send(
        "Product with the given ID is already used. Please enter a different ID."
      );
  const newproduct = { id: req.body.id, name: req.body.name };
  //Adding new product
  products.push(newproduct);
  res.send(newproduct);
});

app.delete("/api/products/:id", (req, res) => {
  const product = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  console.log(product);
  if (!product)
    return res.status(404).send("Product with the given ID not found.");
  if (product) {
    let index = products.indexOf(product);
    products.splice(index, 1);
    res.send(product);
  }
});

//Setup port dynamically
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
