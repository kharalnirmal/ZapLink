
import mongoose from "mongoose"

const connectDB= async()=>{
    try {
        const connect= await mongoose.connect(process.env.MONGODB_URI,{});
        console.log(`DB Connection is Successful: ${connect.connection.host}`);
    } catch (error) {
        console.log(`DB Connection is Unsuccessful,${error.message}`);
        process.exit(1);
    }
}

export default connectDB;