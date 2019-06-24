import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import  bcryptjs  from 'bcryptjs';

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dateCreation: { type: Date, default: Date.now }

})

UserSchema.methods.encryptPassword = async (password) => {

    const salt = await bcryptjs.genSalt(10);
    const hash = bcryptjs.hash(password, salt);
    return hash;
}

UserSchema.methods.matchPassword = async (password) =>{

    return await bcryptjs.compare(password, this.password);
}

const User = mongoose.model('User',UserSchema);

export {User};