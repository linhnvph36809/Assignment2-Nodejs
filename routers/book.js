import express from 'express'; 
import Model from "../modelBook.js";
import Joi from "joi" ; 

const router = express.Router() ; 

function validate({name,image,price,description,author}){
    const schema = Joi.object({
        name: Joi.string().required().empty().messages({
            "any.required": "Vui lòng nhập tên",
            "string.empty": "Tên không đúng định dạng",  
        }),
        image: Joi.string().required().empty().messages({
            "any.required": "Vui lòng chọn ảnh",
            "string.empty": "Ảnh không đúng định dạng",  
        }),
        price: Joi.number().required().messages({
            "any.required": "Vui lòng nhập giá",
        }),
        description: Joi.string().required().empty().messages({
            "any.required": "Vui lòng nhập mô tả ",
            "string.empty": "Mô tả không được để trống",  
        }),
        author: Joi.string().required().empty().messages({
            "any.required": "Vui lòng nhập author",
            "string.empty": "Author không được để trống",  
        })
    
    })
    const {error,value} = schema.validate({name,image,price,description,author}) ;
    return error ;
}



router.get("/books", async (req,res) =>{
    const books = await Model.find() ; 
    res.send(books) ; 
}) ; 

router.get("/books/:id", async (req,res) =>{
    const id = req.params.id ; 
    try {
        const books = await Model.findOne({_id:id}) ; 
        res.send(books) ; 
    } catch (error) {
        res.send({
            status: false, message: "Không tìm thấy"
        }) ; 
        
    }
}) ; 

router.post("/books", async (req,res) =>{
    const body = req.body ; 
    const error = validate(body) ; 
    if(error){
        res.send({status: false, message: error.message}) ;
    }else{
        const books = await new Model(body).save();
        res.send(books) ;
    }
}) ; 

router.put("/books/:id", async(req,res) =>{
    const id = req.params.id ; 
    const body = req.body ; 
    const error = validate(body) ; 
    if(error){
        res.send({status: false, message: error.message}) ;
    }else{
        const book = await Model.findOneAndUpdate({_id:id},body,{new:true}) ; 
        res.send(book) ; 
    }
}) ; 


router.delete("/books/:id",async (req,res) => {
    const id = req.params.id ; 
    try {
        const book = await Model.deleteOne({_id:id}) ; 
        res.send(book) ; 
    } catch (error) {
        res.send({
            status: false,
            message: "Xóa không thành công"
        }) ; 
        
    }
})


export default router ; 