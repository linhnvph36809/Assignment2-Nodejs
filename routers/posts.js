import express from 'express'; 
import checkToken from '../Middleware/checkToken.js';
import {getPost,getPostDetail,addPost,updatePost,deletePost,getComparePosts} from '../controllers/Posts/Posts.js';
const router = express.Router() ; 

router.get("/posts",getComparePosts) ; 
router.get("/posts/:id",getPostDetail) ; 
router.post("/posts",checkToken,addPost) ; 
router.put("/posts/:id",checkToken,updatePost) ; 
router.delete("/posts/:id",checkToken,deletePost) ; 

export default router ; 