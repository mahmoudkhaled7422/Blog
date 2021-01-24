const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const { Schema }=mongoose;

const  userSchema =new Schema({
userName:{
    type:String,
    unique:true,
    required:true,
    minLength:8
},
password:{
    type:String,
    required:true
},
firstName:{
    type:String,
    minlength:3,
    maxLength:15,
    required:true
},
age:Number,
photo:String,
followers:[{
    type:Schema.Types.ObjectId,
    ref:'User'
}],
following:[{
    type:Schema.Types.ObjectId,
    ref:'User'
}]
},
{
    toJSON:
    {
        transform:(doc,ret,options)=>
        {
            delete ret.password;
            return ret;
        },
    },
}
);

userSchema.pre('save', function preSave(next)
{
    this.password =bcrypt.hashSync(this.password,8);
    next();
});
userSchema.pre('findOneAndUpdate',function preSave(next)
{
    if(!(this._update.password))
        next();
    this._update.password=bcrypt.hashSync(this._update.password,8);
    next();
});
userSchema.methods.validatePassword =function validatePassword(password)
{
     return bcrypt.compareSync(password,this.password);
}


const userModel= mongoose.model('User',userSchema);
module.exports=userModel;