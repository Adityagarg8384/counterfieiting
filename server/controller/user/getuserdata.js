const {getAuth}= require("@clerk/nextjs/server");
const User= require("../../../models/usermodel");

exports.getuserdata= async(req,res)=>{
    try{
        const {userId} = getAuth(req);
        const user= await User.findById(userId);
        
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            })
        }
        return res.status(200).json({
            success:true,
            user,
        })     
    }
    catch(err){
        console.log(err);
    }
}