const bcrypt= require("bcryptjs");

exports.encrypt= async(req,res)=>{
    try{
        const hash= req.body.hash;

        const encryptedhash = await bcrypt.hash(hash, 2);
        if(!encryptedhash){
            return res.status(404).json({
                success:false,
                message:"Cannot encrypt the password",
            })
        }
        else{
            return res.status(200).json({
                success:true,
                encryptedhash
            })
        }
    }
    catch(err){

    }
}

