const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors')


const app = express();
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1/RestAPI')
 .then(()=>{
  console.log(`MongoDB connecting ....`)
  })
  .catch(()=>{
  console.log('cant connect...')
  })

app.use('/test/:id', (req,res)=>{
  //console.log(req.query);
 // res.send(req.query);
 console.log(req.params);
 res.send(req.params);
})

app.use('/test', (req,res)=>{
  console.log(req.body);
  res.send(req.body);
})



const hostname = '127.0.0.1';
const port = 3000;

const ProductRoute = require('./Routes/Product.route');
app.use('/products', ProductRoute);

//  404 error handler and pass to error handler : ctr +k+c
app.use((req,res,next)=>{
  // const err = new Error("Not found");
  // err.status = 404;
  //next(err);
  next(createError(404,"Not found"));
});

// error handler 
app.use((err,req,res,next)=>{
  res.status(err.status || 500);
  res.send({
    error:{
      status: err.status || 500,
      message: err.message
    }
  })
})

app.listen(port, hostname, () =>{
    //console.log(`Hello Yen hehehe ${hostname}:${port}/`)
});

