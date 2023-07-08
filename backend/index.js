const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');


const dotenv = require("dotenv").config();
const authRouter = require("./controllers/auth");
const blogRouter = require("./controllers/blogController");
const categoryRouter = require("./controllers/categories");
const userRouter = require("./controllers/userController");

const multer = require("multer");
const path = require("path");

const app = express();
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")));


// app.use(cors());

app.use(express.urlencoded({extended:true}))


mongoose.connect(
    process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
       
    }).then(console.log("Connected to MongoDb")).catch((err)=>console.log(err));

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "images");
        },
        filename: (req, file, cb) => {
          cb(null, req.body.name);
        //   cb(null,"pic.jpeg");
        },
      });
      
      const upload = multer({ storage: storage });
      app.post("/api/upload", upload.single("file"), (req, res) => {
        res.status(200).json("File has been uploaded");
      });


app.use('/api/auth',authRouter);
app.use('/api/users',userRouter);
app.use('/api/posts',blogRouter);
app.use('/api/categories',categoryRouter);



app.listen(process.env.PORT,()=>console.log(`Server running at port ${process.env.PORT}`)
);

