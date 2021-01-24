const express= require('express');
const { create , getAll , getbyId , editbyId , deletbyId } = require('../controllers/blog');
const router = express.Router();
//photo
const multer =require('multer');
const { blogSchema }=require("../models/Blog");
const storage =multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,'./uploads')
    },
    filename:function(req,file,cb)
    {
        cb(null,Date.now()+'-',originalname);
    }
})
router.post('/',async(req,res,next) => {
    const {body,user:{id}} = req;
    try{
        const blog= await create({...body,userId:id});
        res.json(blog)

    }catch(e){
        next(e);
    }
});
router.get('/',async(req,res,next) =>{
    try{
        const blog= await getAll();
        res.json(blog)

    }catch(e){
        next(e);
    }
});
router.get('/:id',async(req , res,next) =>
{
    const{ params: { id } }=req;
    try{
        const blog= await getbyId(id);
        res.json(blog)

    }catch(e){
        next(e);
    }
});
router.patch('/:id',async(req,res,next) =>{
    const{ params: { id } , body}=req;
    try{
        const blog= await editbyId(id,body);
        res.json(blog)

    }catch(e){
        next(e);
    }
});
router.delete('/:id',async(req , res , next) =>
{
    const {params :{id}}=req;
    try{
        const blog= await deletbyId(id);
        res.json(blog)

    }catch(e){
        next(e);
    }
});

module.exports=router;