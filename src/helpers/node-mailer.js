import nodemailer from 'nodemailer';
import express from 'express';

const app = express();
const port = process.env.PORT || 3002;


const auth = {
    type: 'oauth2',
    user: 'fjmn2c@gmail.com',
    clientId: '844506636305-b936b5p6gkvrg1ip5kf9m61be35gth90.apps.googleusercontent.com',
    clientSecret: 'hnFxE5solK4KDHk_uuitG8fg',
    refreshToken: '1/CEY1K4lXEE7W4qhVSfHN0a8AWR0T0cQcRRq7rsUd4WdQVPTxlDhv-MOUztDXy3S1',
    accessToken: 'ya29.Gls4B914fmYGRdmZ1VkKA-_uRk6HTI3MbYeMWUnrIxVvBodxFhdjRPJa8xhh_R0ltrb4Ph0V6gRHp865FgBXtw2n_4j7C7p8yYxlRXJqfOPkGSELY-vX55oD3kju'
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

 


