import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
    const {name,email, password}=req.body;
    //check if user already exist
    const userExist= await prisma.user.findUnique({
        where :{email:email},
    });

    if(userExist){
        return res.status(400).json({error:"User already exist"})
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword= await bcrypt.hash(password, salt);

    //create User
    const user= await prisma.user.create({
        data:{
            name,
            email,
            password: hashPassword,
        }
    });

    //Generate JWT Token
    const token= generateToken(user.id,res)

    res.status(201).json({
        status:"success",
        data:{
            user:{
                id: user.id,
                name: name,
                email:email
            },
            token,
        }
    })

}

const login= async(req, res)=>{
    const {name,email, password}=req.body;

    //check if user email exist in the table
    const user= await prisma.user.findUnique({
        where :{email:email},
    });

    if(!user){
        return res.status(401).json({error:"invalid email or password"})
    }

    //verify the password
    const isPasswordvalid= await bcrypt.compare(password,user.password);
    if(!isPasswordvalid){
        return res.status(401).json({error:"invalid email or password"})
    }

    //Generate JWT Token
    const token= generateToken(user.id,res)

    //return
    res.status(201).json({
        status:"success",
        data:{
            user:{
                id: user.id,
                email:email
            },
            token
        }
    })
}

const logout= async (req, res)=>{
    res.cookie("jwt","",{
        httpOnly:true,
        expire: new Date(0)
    });
    res.status(200).json({
        status: "success",
        message: "Logged out successfully"
    });
}

export { register,login, logout };