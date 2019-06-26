import mongoose from 'mongoose';

export default {

  connectDB : async () => {

    const response = await mongoose.connect('mongodb://localhost:27017/poliDB');
    if (response) {
        console.log(`connected to mongodb://localhost:27017/poliDB`)
    }
    else {
        console.log(`Error to connect to mongodb://localhost:27017/poliDB`)
    }

}
}
