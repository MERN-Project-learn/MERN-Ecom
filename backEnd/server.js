const app = require('./app');
const dotenv = require("dotenv")
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database")

//Handling Uncaught exceptions
process.on("uncaughtException",(err)=>{
     console.log(`error:${err.message}`);
     console.log(`sutting down the server due to  Uncaught exceptions`)
     server.close(()=>{
         process.exit(1);
     });
})


//config

dotenv.config({path:"backEnd/config/config.env"})

//connection to databse 

connectDatabase()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const server = app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`);
})

//unHandle promise rejection
process.on('unhandleRejection',(err)=>{
    console.log(`error:${err.message}`);
    console.log(`sutting down the server due to uncatch handle error`);

   server.close(()=>{
       process.exit(1);
   });

})