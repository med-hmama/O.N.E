const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


module.exports.logIn = async (req,res)=>{
    try {
        const user = await User.findOne({ pseudo: req.body.pseudo});
        if(!user) return res.status(400).send("Invalid username");

        const validPass = await bcrypt.compare(req.body.password , user.password);
        if(!validPass) return res.status(400).send("Invalid password");
     
        const token = jwt.sign({_id:user._id,role:user.role , firstName:user.firstName}, process.env.TOKEN_SECRET , {expiresIn:86400});
        res.status(200).send({token : token , role : user.role});

    }catch(err){
        return res.status(400).json({ message: err });
    }
 };