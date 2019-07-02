import express from 'express';
import {routerUser} from './routes/users';
import dataBase from './database';
import validate from './helpers/signup-helper'
import dotenv from 'dotenv'

console.clear();
const app = express();

dotenv.config();
dataBase.connectDB();

app.set ('port', process.env.PORT);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(routerUser);

  app.listen(app.get('port'),()=>{
    console.log(`port ${process.env.PORT} listening!!`);
})
  





