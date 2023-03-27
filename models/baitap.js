const mongoose = require('mongoose');
const BaitapSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  albumId: {
    type: Number
  },
  title: {
    type: String
  },
  url: {
    type: String
  },
  thumbnailUrl: {
    type: String
  }
});
const Baitap = mongoose.model('Baitap', BaitapSchema);
module.exports = Baitap;