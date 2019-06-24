import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/test')
.then (data =>{
    console.log('connected!');
})
.catch(err =>{ 
    console.log('error conection!',err); 
});
