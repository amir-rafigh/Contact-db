import {model , models , Schema} from "mongoose"

const contactSchema = new Schema({
    FirstName:{
        type: String,
        minLength:[3,"firstname muste more than 3 character"],
        maxLength:[15 , "firstname must less than 15 character"]

    },
    LastName:{
        type:String , 
        minLength:[3 , "Last Name must more than 3 character"],
        maxLength:[25, "Last Name must less than 25 character"]
    },
    Age:{
        type:Number,
        min:[18 , "your old must atleast 18"]
    },
    Phone:{
        type: String,
        match:[/09\d{9}/ , "your phone number must start by 09 and the phone number must to be 11 numbers"],
        maxLength:[11 , "the phone number should not be longer than 11 digits"]
    },
    Gender:{  type:String }


})

const modelcontacts = models.modelcontacts || model("modelcontacts" , contactSchema)
export default modelcontacts;