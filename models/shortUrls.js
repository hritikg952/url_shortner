const mongoose = require("mongoose");
const shortId = require("shortid");
const shortUrlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    default: shortId.generate,
  },
  clicks: {
    type: String,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("shortUrls", shortUrlSchema);
