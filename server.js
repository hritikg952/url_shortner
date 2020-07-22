const express = require("express");
const app = express();
const mongoose = require("mongoose");

const shortUrls = require("./models/shortUrls");

mongoose
  .connect("mongodb://localhost:27017/urlShortener", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB CONNECTED"))
  .catch((err) => {
    console.log(err);
  });
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const data = await shortUrls.find();
  res.render("index", { urlData: data });
});

app.post("/shortUrls", async (req, res) => {
  await shortUrls.create({ fullUrl: req.body.fullUrl });
  res.redirect("/");
});

app.get("/:shorturl", async (req, res) => {
  const shrinked = await shortUrls.findOne({ shortUrl: req.params.shorturl });
  if (shrinked == null) {
    return res.sendStatus(404);
  }
  shrinked.clicks++;
  shrinked.save();

  res.redirect(shrinked.fullUrl);
});
app.listen(process.env.PORT || 5000);
