const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const asyncSign = promisify(jwt.sign);


const User = require('../models/User');
const create = (user) =>
{
    return User.create(user);
}
const getAll=() => User.find({}).exec();
const editbyId=({id,body}) => User.findByIdAndUpdate(id,body,{new:true}).exec();
const login=async ({ userName, password }) => {
    const user = await User.findOne({ userName:userName }).exec();
    if(!user){
        throw Error('Wrong pass OR username');
    }
    const Pass=user.validatePassword(password);
    if(!Pass){
        throw Error('Wrong pass OR username');
    }
    const token = await asyncSign({
        userName: user.userName,
        id: user.id,
      }, 'SECRET_COMPLEX', { expiresIn: '7d' });
      return { ...user.toJSON(), token };
}
const deletbyId=(id) =>User.deleteOne({_id:id}); 
const follow =async(userId,followedId)=>
{
    try{
        const u=await User.findByIdAndUpdate(userId,{$addToSet:{following:followedId}},{new:true}).exec();
    }
    catch(e)
    {
        throw e;
    }
    try{
        const u2=await User.findByIdAndUpdate(followedId,{$addToSet:{followers:userId}},{new:true}).exec();
    }
    catch(e)
    {
        throw e;
    }
    return;
};

const unfollow =async(userId,followedId)=>
{
    try{
        const u=await User.findByIdAndUpdate(userId,{$pull:{following:followedId}},{new:true}).exec();
    }
    catch(e)
    {
        throw e;
    }
    try{
        const u2=await User.findByIdAndUpdate(followedId,{$pull:{followers:userId}},{new:true}).exec();
    }
    catch(e)
    {
        throw e;
    }
    return;
};
module.exports={
    create,
    getAll,
    editbyId,
    login,
    deletbyId,
    follow,
    unfollow
}