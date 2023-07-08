const blogRouter = require("express").Router();


const Blog =require("../models/Blog");

blogRouter.get('/',async (req,res)=>{

    const username = req.query.user;
    const catname = req.query.cat;

    try{
        let blogs;
        if(username){
            blogs = await Blog.find({username});
            
        }
        else if(catname){
            blogs = await Blog.find({categories:{
                $in:[catname],
            }});
        }
        else{
            blogs =await Blog.find();
        }
        // const blogs = await Blog.find({}).populate("userId",'-password');
        res.status(200).json(blogs);
    }

    catch(err){
        res.status(500).json(err);
    }
});

// get single blog 

blogRouter.get('/:id', async(req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id);
        blog.views+=1;

        const curPost =await blog.save();
        res.status(200).json(curPost);
    }

    catch(err){
        res.status(500).json(err);
    }
});


// get featured blogs

blogRouter.get('/all/featured',async(req,res)=>{
    try{
        const blogs = await Blog.find({featured:true});

         res.status(200).json(blogs);
    }
    catch(err){

        res.status(500).json(err);
    }
});

blogRouter.post("/", async(req,res)=>{
    const newPost =new Blog(req.body);
    // console.log(req.body);
    try{
        const savedPost = await newPost.save();
        // console.log(savedPost);

         res.status(201).json(savedPost);
    }
    catch(err){
         res.status(500).json(err);
    }
})

// update blog 
blogRouter.put("/:id",async(req,res)=>{
    try {
        const post = await Blog.findById(req.params.id);
        if (post.username === req.body.username) {
          try {
            const updatedPost = await Blog.findByIdAndUpdate(
              req.params.id,
              {
                $set: req.body,
              },
              { new: true }
            );
            res.status(200).json(updatedPost);
          } catch (err) {
            res.status(500).json(err);
          }
        } else {
          res.status(401).json("You can update only your post!");
        }
      } catch (err) {
        res.status(500).json(err);
      }
});


blogRouter.put('/likeBlog/:id', async(req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id);

        if(blog.likes.includes(req.user.id)){
            blog.likes = blog.likes.filter((userId)=>userId!==req.user.id);
            await blog.save();

            res.status(200).json({msg:"Successfully unliked the blog!"})

        }else{
            blog.likes.push(req.user.id);
            await blog.save();
            res.status(200).json({msg:"Successfully liked the blog!"})

        }
    }
    catch(err){
        return res.status(500).json(err);   
    }
});

blogRouter.delete('/:id',async(req,res)=>{
    try{
        const post = await Blog.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                await Blog.findByIdAndDelete(req.params.id);
                res.status(200).json("Post has been deleted...");
            }
            catch(err){
                res.status(500).json(err);
            }
        }
        else{
            res.status(401).json("You can delete only your own post!");

        }
       
    }
    catch(err){
        res.status(500).json(err);
    }
})


module.exports = blogRouter;