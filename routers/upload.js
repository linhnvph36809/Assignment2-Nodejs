import express from 'express';
import upload from '../Models/modelUpload.js'
import fs from 'fs'
const routerUpload = express.Router();
    routerUpload.post('/upload',upload.any(),(req,res)=>{
        try {
        console.log(req.files);
        const imagename = req.files[0].filename;
        const url = `/file/image/${imagename}`
        res.status(200).send({status:true,image:url})
    } catch (error) {
            
    }
    })
    routerUpload.get('/image/:filename',(req,res)=>{ 
        const filename = req.params.filename
        const image = fs.readFileSync(`./uploads/${filename}`)
        res.contentType('image/jpeg')
        res.send(image)
    })

export default routerUpload