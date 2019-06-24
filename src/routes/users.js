import express from 'express';
import { User } from '../models/User';

const router = express.Router();


router.post('/user',(user)=>{


})



const newUser = new User({ name: 'Juan', email: 'juan@gmail.com', password: '123456' });
console.log(newUser);
newUser.encryptPassword(newUser.password)
    .then(pass => {
        newUser.password = pass;

    })
    .catch(err => {
        console.log(err)
    })

export {router};    