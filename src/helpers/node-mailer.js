import nodemailer from 'nodemailer';
import express from 'express';

const app = express();
const port = process.env.PORT || 3002;


const auth = {
    type: 'oauth2',
    user: 'fjmn2c@gmail.com',
    clientId: '844506636305-b936b5p6gkvrg1ip5kf9m61be35gth90.apps.googleusercontent.com',
    clientSecret: 'hnFxE5solK4KDHk_uuitG8fg',
    refreshToken: '1/4KWJboLkWKTEMddL2eVu0W8eQrb5nxds7z7ZEDtWKis',
    accessToken: 'ya29.Gls4B99kXs52anvwuVsupotGkfPd0KwitaPc2TY-wYiWRy5_X0Cn1INunzEHHbcnjBRJxHoTbM34LJ01f8Za0EeTZdfEyo64mk3BMfPGXLPZt_xhsY9HVYZQ7UWh'
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

 


