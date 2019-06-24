import express from 'express';
import mongoose from 'mongoose';
import {router} from './routes/users'
const app = express();


app.set ('port', process.env.PORT || 3000);

app.listen(app.get('port'),()=>{
    console.log(`port ${app.get('port')} listening!!`)
})

app.use(router);


mongoose.connect('mongodb://localhost:27017/test')
.then (data =>{
    console.log('connected!');
})
.catch(err =>{ 
    console.log('error conection!',err); 
});

