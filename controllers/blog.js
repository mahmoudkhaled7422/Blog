const Blog = require('../models/Blog');
const create = (blog) => Blog.create(blog);
const getAll = () => Blog.find({}).exec();
const getbyId = (id) => Blog.findById(id).exec();
const editbyId = (id,body) => Blog.findByIdAndUpdate(id,body,{new:true}).exec();
const deletbyId = (id) =>Blog.deleteOne({_id:id}).exec(); 
module.exports = {
    create,
    getAll,
    getbyId,
    editbyId,
    deletbyId
}

