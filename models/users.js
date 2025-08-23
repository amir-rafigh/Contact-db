import{model , models , Schema} from "mongoose"

const userschema = new Schema({
    FirstName:{
        type:String,
        minLength:3,
        maxLength:15,
        required : true

    },
    LastName:{
        type:String,
        minLength:3,
        maxLength:15,        
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
        min:8,        
        unique:true

    },
    Phone:{
        type:String,
        required:true,
    },
    Role:{
        type:String,
        enum:["admin" , "user"],
        default:"user"
    },
    Code:{
        type:String,        
    },
    Exp_time:{
        type:Date
    }



})
const users = models.users || model("users" , userschema)
export default users