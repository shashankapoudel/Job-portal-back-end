import mongoose from 'mongoose'

const connectDB = async()=>{
try{
   const conn = await mongoose.connect(process.env.MONGO_URL)
   console.log('Connected to Mongodb Database ${mongoose.connection.host}'.bgMagenta.white);
}
catch(error){
  console.log(`MongoDB Error ${error}`.bgRed.white)
}
};
export default connectDB;