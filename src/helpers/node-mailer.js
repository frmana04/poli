import nodemailer from 'nodemailer';
import express from 'express';

const app = express();
const port = process.env.PORT || 3002;


const auth = {
    type: 'oauth2',
    user: process.env.EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET ,
    refreshToken:process.env.REFRESH_TOKEN,
    accessToken:process.env.ACCESS_TOKEN 
};

const sendMail=(mailOptions,callback)=>{

     nodemailer.createTransport({
        service: 'gmail',
        auth: auth,
    })
    .sendMail(mailOptions, (err) => {
      
        if (err) {
            console.log(err)
            return callback(false)

        }
     
        else return callback(true)
        
    
    });

   
}

export {sendMail}

 


