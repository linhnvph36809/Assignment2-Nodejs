import express from 'express'; 
import mongoose  from "mongoose"; 
import dotenv from "dotenv" ; 
import router from "./routers/book.js" ; 

const app = express();
const port = 4000 ; 

app.use(express.json());

app.use("/",router);

const connectDB = () => {
    const url = dotenv.config().parsed.DB_URL
    mongoose.connect(url)
    .then(() => console.log('Connected!'))
    .catch(() => console.log('Can not connected'));
}


app.listen(port,() => {
    connectDB() ; 
    console.log('listening on port ' + port);
});
