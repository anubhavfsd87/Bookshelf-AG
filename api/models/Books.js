const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
   owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
   title: String,
   isbn: Number,
   numberOfPages: Number,
   photos: [String],
   description: String,
   perks: [String],
   extraInfo: String,
   SecureCheckIn: Number,
   SecureCheckOut: Number,
   price: Number,
});

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;