import mongoose from "mongoose";

type ConnectionObject ={
    isConnected?:number
}
const connection : ConnectionObject ={}

async function dbConnect():Promise<void> {
    if(connection.isConnected){
        console.log("already connected to database ");
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI || '',{} )
        connection.isConnected=mongoose.connection.readyState;
        console.log("db connected successfully")

    } catch(error){
        console.log("db connection failed");
        process.exit(1);


    }
}
export default dbConnect;