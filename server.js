const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
var MongoClient = require("mongodb").MongoClient;
var dbo;
let connectionString =
  "mongodb+srv://LakshmiPrasanna:CHInni@123@cluster0.pfyd2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
MongoClient.connect(connectionString, { useNewUrlParser: true })
  .then((db) => {
    console.log("Connected to Database");
    dbo = db.db("todo-app-database");
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, ".client/build")));
app.get("/", function (req, res) {
  res.send("successfully lanuched");
});
app.get("/stocks", function (req, res) {
  dbo
    .collection("stocks")
    .find()
    .toArray()
    .then((stocks) => {
      res.status(200).send(stocks);
      console.log(stocks);
    });
});
app.post("/insert", function (req, res) {
  dbo.collection("stocks").insertOne(
    {
      name: req.body.name,
      symbol: req.body.symbol,
      max_supply: req.body.max_supply,
    },
    function (err, result) {
      if (err) res.send("Error");
      else res.send("Success");
      console.log(req.body);
    }
  );
  console.log("hello");
});
app.delete("/delete", function (req, res) {
  console.log(req.body);
  dbo
    .collection("stocks")
    .findOne({ name: req.body.name })
    .then((res) => {
      console.log(res);
      dbo.collection("stocks").remove(res, function (err, records) {
        if (err) {
          console.log("Error" + err);
        } else {
          res.status(200).send("success");
        }
      });
    });
});
