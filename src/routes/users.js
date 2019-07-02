import express from "express";
import { User } from "../models/User";
import validate from "../helpers/signup-helper";
import { sendMail } from "../helpers/node-mailer";
import  jwt  from 'jsonwebtoken';


const routerUser = express.Router();

routerUser.post("/user", async (req, res) => {

    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const errors = validate.checkAll(userName, email, password, {password,confirmPassword});
    const error = errors.indexOf(false) != -1 ? true : false;
    console.log(errors, error);
    // if some data are not validate in form
    if (error) {
        res.send({ status: false, message: "Error data", data: null});
        return console.log("Error data");
    }
    ////////////////////////////////////////

    // if the user already exist
    const alreadyExist = await User.find().or([
        { userName: req.body.userName },
        { email: req.body.email }
    ]);

    if (alreadyExist.length > 0) {
        res.send({ status: false, message: "User already exist!", data: null });
        return console.log("User already exist!", alreadyExist);
    }
    ///////////////////////////

    // Create the user and encrypting password process
    const newUser = new User({ userName: req.body.userName, email: req.body.email, password: req.body.password });
    
    const encryptedPass = await newUser.encryptPassword(newUser.password);

    if (encryptedPass) newUser.password = encryptedPass;
    else {
        res.send({ status: false, message: "Error encrypting password", data: null });
        return console.log("Error encrypting password!");
    }
    //////////////////////////////////

    //saving user in DB
    const userSaved = await newUser.save();

    if (userSaved) {

        const mailSended = await sendMail(
            {
                from: process.env.EMAIL,
                to: userSaved.email,
                subject: "Email confirmation",
                text: "Email confirmation",
                html: `<a href="http://localhost:3000/confirm/${userSaved._id}">Confirm email!</a>`
            },
            async emailSended => {
                if (emailSended){ 
                res.send({ status: true, message: "User saved!", data: userSaved });
                return console.log("user saved!", userSaved);
            }
                else { 
                    console.log("error mail");
                    const userDeleted = await User.deleteOne({ userName: userSaved.userName })
                        if (!userDeleted) {
                            res.send({ status: false, message: "Error mail and deleting the user", data: null });
                            return console.log('Error mail and deleting userName')
                        } 
                        else {
                            res.send({ status: false, message: "Error mail", data: null });
                            return console.log('Error mail')
                        }
               
                }
            }
        );

    } else {
        res.send({ status: false, message: "User doesnt saved!", data: null });
        return console.log("Error, user doesnt saved!");

    }
});

routerUser.get("/users", async (req, res) => {
    const users = await User.find({});

    if (users) {
        res.send({
            status: true,
            message: "Got Users!",
            data: users
        });
    } else {
        res.send({
            status: false,
            message: "Error, no users!",
            data: null
        });
    }
});

routerUser.get("/users/username/:userName", async (req, res) => {
    console.log(req.params.userName);

    const user = await User.findOne({ userName: req.params.userName });
    if (user) {
        user.password = null;
        res.send({
            status: true,
            message: "User exist!",
            data: user
        });
    } else {
        res.send({
            status: false,
            message: "User does not exist!",
            data: user
        });
    }
});

routerUser.get("/users/:userId", async (req, res) => {
    console.log(req.params.userId);
    const user = await User.findById(req.params.userId);

    if (user) {
        user.password = null;
        res.send({
            status: true,
            message: "User exist!",
            data: user
        });
    } else {
        res.send({
            status: false,
            message: "User does not exist!",
            data: user
        });
    }
});

routerUser.get("/confirm/:userId", async (req, res) =>{
    
    const userUpdated = await User.findByIdAndUpdate(req.params.userId, { userActivated: true })
    if (userUpdated){
        res.send({
            status: true,
            message: "user activated!",
            data: userUpdated,
        });
        return console.log('user activated!')

    }
    else {
        res.send({
            status: false,
            message: "Errror, user no activated!",
            data: null,
        });
        return console.log('Error,user no activated!')

    }
    
   
});

routerUser.get("/delete/:userId", async (req,res) =>{

    const userDeleted = await User.findByIdAndDelete(req.params.userId)
    console.log(userDeleted)
    if (userDeleted){
        res.send({
            status: true,
            message: "user deleted!",
            data: userDeleted,
        });
        return console.log('user deleted!')
    }
    else {
        res.send({
            status: false,
            message: "Error,user no deleted!",
            data: null,
        });
        return console.log('user no deleted!')
    }

})

routerUser.post("/login", async (req,res) =>{

   const user = await User.findOne({userName:req.body.userName})
   if (user) {
   console.log(user)
    const match=await user.matchPassword(req.body.password)
    if (match){

    res.send({
        status: true,
        message: "User logged!",
        data: user
    });
}
else{
    res.send({
        status: true,
        message: "Incorrect password",
        data: user
    });
}
} 
else {
    res.send({
        status: false,
        message: "User does not exist!",
        data: user
    });
}

})



export { routerUser };
