import mongoose  from "mongoose"; 
const bookSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    author: String

},{
    timestamps: true
}) ; 
const Model = new mongoose.model('books', bookSchema);
export default Model;