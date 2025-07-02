import mongoose,{Schema,Document} from "mongoose";

export interface Message extends Document{
    content:String;
    createdAt:Date
}

const MessageSchema:Schema<Message>= new Schema ({
    content:{
        type:String,
        required:true

    },
     createdAt:{
        type:Date,
        required:true,
        default:Date.now

     }
})

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifycode:string;
    verifycodeExpiry:Date;
    isverified:boolean;
    isAcceptingmessage:boolean; 
    message:Message[]
}
const UserSchema:Schema<User>= new Schema ({
    username:{
        type:String,
        required:[true,"username is required"],
        trim: true, // trims the spaces
        unique:true

    },
     email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
,"please use a valid email address"]

     },
     password:{
        type:String,
        required:[true,"password is required"],
     },
     verifycode:{
        type:String,
        required:[true,"verify code  is required"],

     },
     verifycodeExpiry:{
        type:Date,
        required:[true,"verify code expiry  is required"],
     },
      isverified:{
        type:Boolean,
        default:false,
     },
      isAcceptingmessage: {
        type: Boolean,
        default: true,
  },
  message:[MessageSchema]
})
const UserModel= (mongoose.models.User as mongoose.Model<User>) || mongoose.model("User",UserSchema)

export default UserModel;