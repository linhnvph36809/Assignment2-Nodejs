import mongoose  from "mongoose"; 
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String

},{
    timestamps: true
}) ; 
const modelAuth = new mongoose.model('users', userSchema);
export default modelAuth;