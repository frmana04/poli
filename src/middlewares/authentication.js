import jwt from 'jsonwebtoken';

export const verifyToken =  (req,res,next) => {

    let token = req.get('token');
    const verifyToken =  jwt.verify(token,process.env.SECRET_TOKEN,(err,decoded)=>{
        if (err){
            return res.send({
                status:false,
                message:'invalid token!',
                data: null
            })

        }

    });
    
    next();

}