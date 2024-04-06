import mongoose from "mongoose";

const dbConnect = async () => {
    await mongoose.connect(process.env.MONGO_DB_URI)
        .then(() => console.log("connected to mongoDB"))
        .catch(() => console.log("error connecting to Database"))
}

export default dbConnect