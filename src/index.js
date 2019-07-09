import express from 'express';
import {routerUser} from './routes/users';
import {router} from './routes/index';
import dataBase from './database';
import dotenv from 'dotenv'
import path from 'path'

console.clear();
const app = express();

dotenv.config();
dataBase.connectDB();

console.log( path.join(__dirname,'views'))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(routerUser);
  app.use(router)


  app.listen(process.env.PORT,()=>{
    console.log(`port ${process.env.PORT} listening!!`);
})
  





