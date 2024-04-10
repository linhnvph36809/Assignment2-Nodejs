import validate from "../../Validate/validate.js";
import Model from "../../Models/modelPost.js";

const getPost = async(req,res) => {
    const posts = await Model.find() ; 
    res.send(posts) ; 
}

const getPostDetail = async(req,res) => {
    const id = req.params.id ;
    try {
        const posts = await Model.findOne({_id:id}) ; 
        res.send(posts) ; 
    } catch (error) {
        res.send({
            status: false, message: "Không tìm thấy"
        }) ; 
        
    }
}

const getComparePosts = async(req,res) => {
    try {
        const posts = await Model.find({category: {$gte: 2}}).sort({category: "desc"}) ; 
        res.send(posts) ; 
    } catch (error) {
        res.send({
            status: false, message: "Không tìm thấy"
        }) ; 
        
    }
}

const addPost = async(req,res) => {
    const body = req.body ; 
    const error = validate(body) ; 
    if(error){
        res.send({status: false, message: error.message}) ;
    }else{
        const posts = await new Model(body).save();
        res.send(posts) ;
    }
}

const updatePost = async(req,res) => {
    const id = req.params.id ; 
    const body = req.body ; 
    const error = validate(body) ; 
    if(error){f
        res.send({status: false, message: error.message}) ;
    }else{
        const post = await Model.findOneAndUpdate({_id:id},body,{new:true}) ; 
        res.send(post) ; 
    }
}

const deletePost = async() =>{
    const id = req.params.id ; 
    try {
        const post = await Model.deleteOne({_id:id}) ; 
        res.send(post) ; 
    } catch (error) {
        res.send({
            status: false,
            message: "Xóa thất bại !"
        }) ; 
        
    }
}

export {getPost,getPostDetail,addPost,updatePost,deletePost,getComparePosts} ;