const mongoose=require("mongoose")

const empSchema= new  mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },   
    lastName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    gender:{
        type:String,
        require:true
    },
    phoneNumber:{
        type:Number,
        require:true,
        unique:true 
    },
    password:{
        type:String,
        require:true
    },
    confirmPassword:{
        type:String,
        require:true
    },
    answer:{
        type:String,
       
    }
})

const Register= new mongoose.model("Register" , empSchema);

module.exports=Register;