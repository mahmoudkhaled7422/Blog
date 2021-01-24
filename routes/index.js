const express= require ('express');
const blog =require('./blog');
const user = require('./user');
const authMiddleware = require('../middlewares/authour');
const Blog = require('../models/Blog');
const router=express.Router();

router.use('/blogs',authMiddleware,blog);
router.use('/users',user);
router.get('/',async(req,res,next) =>{
    try{
        const getLatest = () => Blog.find().sort([['createdAt',-1]]).exec();
        const blog= await getLatest();
        res.json(blog)
    }catch(e){
        next(e);
    }
});
router.get('/home',async(req,res,next) =>{
    try{
        const getLatest = () => Blog.find().sort([['createdAt',-1]]).exec();
        const blog= await getLatest();
        res.json(blog)
    }catch(e){
        next(e);
    }
});

module.exports=router;