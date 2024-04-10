import express from 'express'; 
import mongoose  from "mongoose"; 
import dotenv from "dotenv" ; 
import router from "./routers/posts.js" ; 
import userRouter from "./routers/auth.js" ;
import routerUpload from './routers/upload.js';
 

const app = express();
const port = 4000 ; 

app.use(express.json());

app.use("/",router);
app.use("/auth",userRouter);
app.use("/upload",routerUpload);

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
