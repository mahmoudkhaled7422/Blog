const express =require('express');
const mongoose =require('mongoose');
const routes=require('./routes')
const app =express();
const { MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI,{useUnifiedTopology:true});


app.use(express.json());

app.use('/',routes);

app.use('*', (req,res,next)=>{
    res.status(404).json({err:'Not Found'});
});
app.use((err,req,res,next)=>{
    if(err instanceof mongoose.Error.ValidationError)
    {

        return res.status(422).json(err.errors)
    }
    console.log(err);
});
const { PORT=3000 }=process.env;
app.listen(PORT,()=>{
    console.log("Ready");
});