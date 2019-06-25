import mongoose from 'mongoose';

export default {

  connectDB : async () => {

    const response = await mongoose.connect('mongodb://localhost:27017/test');
    if (response) {
        console.log(`connected to mongodb://localhost:27017/test`)
    }
    else {
        console.log(`Error to connect to mongodb://localhost:27017/test`)
    }

}
}
