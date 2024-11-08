// require('dotenv').config({path:'./env'})
import dotenv from "dotenv"

import connectDB from "./db/index.js";

dotenv.config({
    path:"./env"
})

connectDB()






/* 
import express from "express"

const app=express()

this way of wrting is called efis
(async ()=>{
   try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

    app.on("ERORR:",()=>{
        console.log("ERROR",error);
        throw error
    })

    app.listen(process.env.PORT,()=>{
        console.log(`APP is listening on port ${process.env.PORT} `)
    })

   } catch (error) {
    console.log("ERROR",error)
    throw err
    
   }
}) ()  */
