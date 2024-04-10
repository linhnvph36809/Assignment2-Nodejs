import Joi from "joi" ; 

function validate({title,image,category,description,author}){
    const schema = Joi.object({
        title: Joi.string().required().empty().messages({
            "any.required": "Vui lòng nhập tiêu đề",
            "string.empty": "Tiêu đề không được để trống",  
        }),
        image: Joi.string().required().empty().messages({
            "any.required": "Vui lòng chọn ảnh",
            "string.empty": "Ảnh không đúng định dạng",  
        }),
        category: Joi.number().required().messages({
            "any.required": "Vui lòng nhập danh mục",
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
    const {error,value} = schema.validate({title,image,category,description,author}) ;
    return error ;
}

export default validate ; 