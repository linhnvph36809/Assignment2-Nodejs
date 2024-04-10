import express from 'express'; 
import modelAuth from "../Models/modelAuth.js";
import Joi from "joi" ; 
import bcrypt from "bcryptjs" ;
import jwt from 'jsonwebtoken' ; 

const userRouter = express.Router() ; 



function validate({name,email,password}){
    const schema = Joi.object({
        name: Joi.string().required().empty().messages({
            "any.required": "Vui lòng nhập tên",
            "string.empty": "Tên không được để trống",  
        }),
        email: Joi.string().required().empty().messages({
            "any.required": "Vui lòng nhập email",
            "string.empty": "Email không được để trống",  
        }),
        password: Joi.string().required().empty().messages({
            "any.required": "Vui lòng nhập mật khẩu",
            "string.empty": "Mật khẩu không được để trống",  
        })
    
    })
    const {error,value} = schema.validate({name,email,password}) ;
    return error ;
}

function validateAuth({email,password}){
    const schema = Joi.object({
        email: Joi.string().required().empty().messages({
            "any.required": "Vui lòng nhập email",
            "string.empty": "Email không được để trống",  
        }),
        password: Joi.string().required().empty().messages({
            "any.required": "Vui lòng nhập mật khẩu",
            "string.empty": "Mật khẩu không được để trống",  
        })
    
    })
    const {error,value} = schema.validate({email,password}) ;
    return error ;
}

userRouter.post("/register", async (req,res) =>{
    const body = req.body ; 
    body.password = await bcrypt.hash(body.password,10)
    const error = validate(body) ; 
    if(error){
        res.send({status: false, message: error.message}) ;
    }else{
        try {
            const user = await new modelAuth(body).save();
            res.send(user) ;
        } catch (error) {
            res.send({status: false, message: "Email đã tồn tại!"}) ;
        }
    }
}) ; 

userRouter.post("/login", async (req,res) =>{
    const body = req.body ; 
    const error = validateAuth(body) ; 
    if(error){
        res.send({status: false, message: error.message}) ;
    }else{
        try {
            const user = await modelAuth.findOne({email: body.email}) ; 
            if(user === null){
                res.send({status:false,message:"Người dùng không tồn tại"}) ; 
            }else{
                const newPassword = user.password
                const isCheck = await bcrypt.compare(body.password,newPassword) ;
                if (isCheck){
                    const token = jwt.sign({uid:user._id},'123456')
                    res.send({status:true,message:"Đăng nhập thành công",user:user,token:token})
                }
                else {
                    res.send({status:false,message:"Mật khẩu không chính xác"})
                }
            }
        } catch (error) {
            res.send({status:false,message:"Xảy ra lỗi"})
        }
    }
}) ; 


export default userRouter