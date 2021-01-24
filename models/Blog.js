const mongoose=require('mongoose');

const { Schema }=mongoose;

const  blogSchema =new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
      type:String,
      // required:true
    },
    body:String,
    author:String,
    tags:[String],
    photo:String,
    createdAt:{
      type: Date,
      default:Date.now(),
   },
})
const blogModel= mongoose.model('Blog',blogSchema);
module.exports=blogModel;