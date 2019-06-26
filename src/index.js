import express from 'express';
import {routerUser} from './routes/users';
import dataBase from './database';
import validate from './helpers/signup-helper'

console.clear();
const app = express();

dataBase.connectDB();

app.set ('port', process.env.PORT || 3000);

app.listen(app.get('port'),()=>{
    console.log(`port ${app.get('port')} listening!!`);
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routerUser);






