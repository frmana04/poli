import express from 'express';
import { User } from '../models/User';
import validate from '../helpers/signup-helper';

const routerUser = express.Router();





routerUser.post('/user', async (req, res) => {

    const alreadyExist = await User.find().or([{ userName: req.body.userName }, { email: req.body.email }]);

    if (alreadyExist.length > 0) {

        res.send({
            status: false,
            message: 'User already exist!',
            data: null
        });
        return console.log('User already exist!', alreadyExist);
    }

    const newUser = new User({ userName: req.body.userName, email: req.body.email, password: req.body.password });
    console.log(newUser._id)
    const userSaved = await newUser.save();

    if (userSaved) {
        console.log('user saved!', userSaved);
        res.send({
            status: true,
            message: 'User saved!',
            data: userSaved
        });
    }
    else {
        console.log('User doesnt saved!');
        res.send({
            status: false,
            message: 'User doesnt saved!',
            data: null
        });
    }

})

routerUser.get('/users', async(req,res)=>{

    const users = await User.find({});

    if (users){
        res.send({
            status: true,
            message: 'Got Users!',
            data: users
        });
    }
    else {
        res.send({
            status: false,
            message: 'Error, no users!',
            data: null
        });
    }     
})

routerUser.get('/users/:userId', async (req,res)=>{

    console.log(req.params.userId)
    const user = await User.findById(req.params.userId)
    
    if (user){
        res.send({
            status: true,
            message: 'User exist!',
            data: user
        });
    }
    else {
        res.send({
            status: true,
            message: 'User does not exist!',
            data: user
        });
    }
    


})

export { routerUser };







// newUser.save((err,user)=>{

//     if (err)
//         console.log(err);
//     else    
//         console.log(user)


// })


// console.log(newUser);
// newUser.encryptPassword(newUser.password)
//     .then(pass => {
//         newUser.password = pass;

//     })
//     .catch(err => {
//         console.log(err)
//     })

