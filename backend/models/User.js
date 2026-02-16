import mongoose from "mongoose";

const userScheme=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Name is Required"]
        },
        email:{
            type:String,
            required:[true,"email is required"],
            unique:true,
            lowercase:true
        },
        password:{
            type:String,
            required:[true,"password is required"],
            minlength:6
        }
    },
    {
        timestamps:true
    }
);

const User= mongoose.model("user",userScheme);

export default User;