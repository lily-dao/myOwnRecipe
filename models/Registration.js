const  mongoose = require("mongoose");
// create an schema
const registrationSchema = new mongoose.Schema({

    email:{
        type: String,
        trim: true
    },
    password:{
        type:String,
        trim:true
    } ,
});
module.exports = mongoose.model('Registration',registrationSchema,'user');