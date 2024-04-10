import mongoose  from "mongoose"; 
const postSchema = new mongoose.Schema({
    title: String,
    image: String,
    category: Number,
    description: String,
    author: String

},{
    timestamps: true
}) ; 
const Model = new mongoose.model('posts', postSchema);
export default Model;