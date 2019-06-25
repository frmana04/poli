import express from 'express';
import { User } from '../models/User';
import validate from '../helpers/signup-helper'

const routerUser = express.Router();


  

routerUser.post('/user',async (req,res)=>{

    
    //const { name, email, password} = req.body;
    


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

export {routerUser};    