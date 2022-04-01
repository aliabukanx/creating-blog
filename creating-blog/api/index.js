const express = require ("express");
const app= express();
const dotenv = require ("dotenv");
const mongoose= require ("mongoose");
const authRoute = require ("./routes/auth")
const userRoute = require ("./routes/users")
const postRoute = require ("./routes/posts")
const CategoryRoute = require ("./routes/categories")
const multer = require ("multer")

dotenv.config();
app.use(express.json()); 

mongoose
 .connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true, family: 4}) 
 .then(console.log('connected mongoDB !'))
 .catch((err)=>console.log(err));

 const storage =multer.diskStorage({
     destination:(req,file,cb) => {
         cb(null,"images");
        },
        filename:(req,file,cb)=>{
            cb(null, req.body.name);
        },
 })

const upload = multer({storage:storage})
app.post("/api/upload", upload.single("file"),(req,res)=>{
    res.status(200).json("file has been upload")
})


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", CategoryRoute);

app.listen("5000", ()=>{
    console.log("backend is running");
});


