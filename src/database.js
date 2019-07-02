import mongoose from 'mongoose';

export default {

  connectDB : async () => {

    const response = await mongoose.connect(process.env.DB);
    if (response) {
        console.log(process.env.DB)
    }
    else {
        console.log(process.env.DB)
    }

}
}
