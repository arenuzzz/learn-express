const express = require("express");
const booksRouter = express.Router();
const app = express();

const products = ["Apple", "Pen", "Pen1"];

//Pug
// app.set("view engine", "pug");

//Ejs
app.set("view engine", "ejs");


app.set("views", "./views");

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use("/static", express.static(__dirname + "/public"));

app.get("/", (req, res, next) => {
  //   next();
  res.send("Hello");
});

app.get("/products", (req, res, next) => {
  res.json(products);
});

// console.
app.get("/products/:id", (req, res, next) => {
  const product = products[req.params.id];

  if (product) {
    res.json({ product });
  } else {
    res.redirect("/");
    // res.status(404).send({ message: "Product not found!", status: 404 });
  }
});

booksRouter.get("/", (req, res) => {
  const error = new Error("kek");

  throw error;

  //   res.send("Books");
});

booksRouter.get("/download", (req, res) => {
  res.download("./public/books.htm", "superbooks", err => {
    console.log("File sent");
    // console.log(err);
  });
});

booksRouter.get("/about", (req, res) => {
  res.send("About Books");
});

app.use("/books", booksRouter);

app.get("/main", (req, res, next) => {
  res.render("main", { title: "Products", message: "Products list", products });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send(err.stack);
});

app.listen(4000, () => {
  console.log("Server started!");
});
