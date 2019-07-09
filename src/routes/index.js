import express from 'express';
import path from 'path'

const router = express.Router();


router.get('/login-signup',function(req,res) {
    res.sendFile(path.join(__dirname, '../views', 'login-singup.html'));
});


  export {router};