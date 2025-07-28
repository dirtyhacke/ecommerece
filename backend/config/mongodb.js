import mongoos  from "mongoose";

const  connectDB = async () => {

    mongoos.connection.on('connected',()=>{
        console.log("db connected");
        
    })
    await mongoos.connect(`${process.env.MONGODB_URI}/ecommerce`)


}

export  default connectDB;