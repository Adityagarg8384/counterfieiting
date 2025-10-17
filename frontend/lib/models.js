import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    imageurl: {type: String, required: true},
    cartitems: {type: Object, default: {}}
}, {minimize: false})

// module.exports= mongoose.model("User", UserSchema);
const User= mongoose.model("User", UserSchema);
export default User;