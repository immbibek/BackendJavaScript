import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from '../utils/ApiError.js'
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponce } from "../utils/ApiResponce.js"

const registerUser=asyncHandler(async (req,res)=>{
   // get user details from frontend
    
   // validation -- not empty
   // check if user is alredy exist : username, email
   // check for images,check for avatar
   // upload them in cloudinary, avatar
   // create user object  -- create entry in db
   // remove and password refresh token field frfom responce
   // check for user creation 
   // return res

   // 1 st step of work-- to get user details form user
   const {fullname,email,username,password }=req.body
   
    //2 nd
   if (
    [fullname,email,username,password].some((field)=>field?.trim() === "")
   ) {
      throw new ApiError(400,"ALl are field arre required")
   }
   // 3rd step
   const existedUser=User.findOne({
    $or:[{username}, {email}]
   })
   if(existedUser){
    throw new ApiError(409,"User with  email or username already exist")
   }
   // 4th step 


   const avatarLocalPath=req.files?.avatar[0]?.path;
   const coverImageLocalPath= req.files?.coverImage[0]?.path;

    //5th step
   if (!avatarLocalPath) {
      throw new ApiError(400,"Avatar file is required");
      
   }
  // 6th step
   const avatar=await uploadOnCloudinary(avatarLocalPath)

   const coverImage= await uploadOnCloudinary(coverImageLocalPath)
   // 7th 
   if(!avatar){
      throw new ApiError(400,"Avatar file is required");
   }

   const user=await User.create({
      fullname,
      avatar: avatar.url,
      coverImage:coverImage?.url || "",
      email,
      password,
      username:username.toLowerCase()
   })

   const createdUser=await User.findById(user._id).select(
      "-password -refreshToken"  // hamilai je je frontend ma pathaunu xaina vhane
   )

   if (!createdUser) {
      throw new ApiError(500,"Something went wrong while regestering the user")
   }

   return res.status(201).json(
      new ApiResponce(200,createdUser,"User register Succesfully")
   )




})

export {registerUser}