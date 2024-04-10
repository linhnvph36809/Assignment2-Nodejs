
import jwt from 'jsonwebtoken' ; 
import modelAuth from "../Models/modelAuth.js";

const checkToken = async (req,res,next) => {
    let auth = req.headers.authorization ; 
    if(auth){
        try {
            const token = auth.split(" ")[1] ; 
            const {uid:id} = jwt.verify(token,'123456') ; 
            const user = await modelAuth.findOne({_id: id}) ; 
            user && next() ; 
        } catch (error) {
            res.send({status:false,message:"Thao tác thất bại"}) ; 
        }

    }else{
        res.send({status:false,message:"Bạn không có quyền truy cập "}) ; 
    }
}

export default checkToken ; 