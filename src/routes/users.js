import express from 'express';
import { User } from '../models/User';
import validate from '../helpers/signup-helper';
import nodemailer from 'nodemailer';

const routerUser = express.Router();


routerUser.post('/user', async (req, res) => {


    const userName = req.body.userName
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    const errors = validate.checkAll(userName, email, password, { password, confirmPassword });
    const error = (errors.indexOf(false) != -1) ? true : false
    console.log(errors, error)
    if (error) {
        res.send({
            status: false,
            message: 'Error data',
            data: null
        });
        return console.log('Error data');
    }
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
    const encryptedPass = await newUser.encryptPassword(newUser.password)

    if (encryptedPass)
        newUser.password = encryptedPass;
    else {
        res.send({
            status: true,
            message: 'User saved!',
            data: userSaved
        });
        return console.log('Error encrypting password!')
    }

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

routerUser.get('/users', async (req, res) => {

    const users = await User.find({});

    if (users) {
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


routerUser.get('/users/username/:userName', async (req, res) => {
    console.log(req.params.userName)

    const user = await User.findOne({ userName: req.params.userName })
    if (user) {
        user.password=null;
        res.send({
            status: true,
            message: 'User exist!',
            data: user
        });
    }
    else {
        res.send({
            status: false,
            message: 'User does not exist!',
            data: user
        });
    }

})


routerUser.get('/users/:userId', async (req, res) => {

    console.log(req.params.userId)
    const user = await User.findById(req.params.userId)

    if (user) {
        user.password=null;
        res.send({
            status: true,
            message: 'User exist!',
            data: user
        });
    }
    else {
        res.send({
            status: false,
            message: 'User does not exist!',
            data: user
        });
    }

})

const auth = {
    type: 'oauth2',
    user: 'fjmn2c@gmail.com',
    clientId: '844506636305-b936b5p6gkvrg1ip5kf9m61be35gth90.apps.googleusercontent.com',
    clientSecret: 'hnFxE5solK4KDHk_uuitG8fg',
    refreshToken: '1/oIGKUEAIQmHt9_UdqoxdSNXsciBzM0o5QXPbCc_Q7y4',
};

routerUser.post('/send', function(req, res){
    const response = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    }
    
    
    const mailOptions = {
        from: req.body.name,
        to: 'fjmn2c_@hotmail.com',
        subject: 'My site contact from: ' + req.body.name,
        text: req.body.message,
        html: 'Message from: ' + req.body.name + '<br></br> Email: ' +  req.body.email + '<br></br> Message: ' + req.body.message,
    };

  const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: auth,
    });

  transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            return console.log(err);
        } else {
            console.log(JSON.stringify(res));
        }
    });
  })
  

export { routerUser };







