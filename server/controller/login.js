const bcrypt= require("bcryptjs");
const User= require("../models/models");
const jwt= require("jsonwebtoken");

exports.login= async(req,res)=>{
    
    try{
        console.log(req.body);
        const email= req.body.emailid;
        const password= req.body.password;
        // console.log(body);
        console.log(email);
        console.log(password);

        if(!email || !password){
            return res.status(404).json({
                success:false,
                message:"All fields are required",
            })

        }

        const user= await User.findOne({email});

        if(user && await(bcrypt.compare(password, user.password))){
            const token= jwt.sign(
                {id:user._id},
                'shhh',
                {
                    expiresIn:'2h',
                }
            );
            user.token=token;
            user.password="";

            const options={
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }

            return res.status(200).cookie("token", token,options).json({
                success:true,
                token,
                user
            })
        }
        else{
            return res.status(404).json({
                success:false,
                message:"User cannot be found",
            })
        }
    }
    catch(err){
        console.log(err);
        return res.status(404).json({
            success:false,
            message:"Some error occurred",
        })
    }
}
