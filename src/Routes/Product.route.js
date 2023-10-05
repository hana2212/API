const express = require('express');
const router = express.Router();
const createError = require('http-errors')

const Product = require('../Models/Product.model')


router.get('/',  async function(req,res, next){
    // next(new Error("cannot get a list of all products"))
    //res.send('getting a list of all products....')
    try{
     //   const results = await Product.find({},{__v :0})  trong đó {} là query
       const results = await Product.find({},{}) // 0 : k lấy, 1 lấy
        res.send(results);
    }
    catch (error){
        console.log(error.message);
    }

});
// create a new product


router.post('/',  async function(req,res,next){
    try{
        const product = new Product(req.body)
        const result = await product.save()
        res.send(result)
    }
    catch (error) {
        console.log(error.message)
    }
    
    
    /*
    console.log(req.body);
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    })
    product.save()
    .then(result =>{
        console.log(result)
        res.send(result);
    })
    .catch(err=>{
        console.log(err.message)
    })
    res.send('product created.... ')
});
*/
})

router.get('/:id', async function(req,res,next){
   const id = req.params.id;
   try {
    const product = await Product.findById(id);
    //const product = await Product.findOne({_id:id});
    if (!product){
        throw createError(404,'Product does not exist')
    }
    res.send(product);
   } catch (error) {
    console.log(error.message)
    next(error);
   }
});

router.patch('/:id', async function(req,res,next){
    try {
    const id = req.params.id;
    const updates = req.body;
    const options = {new:true};


    const result = await Product.findByIdAndUpdate(id,updates, options)
    res.send(result);

    } catch (error) {
    console.log(error.message)
    }

});

router.delete('/:id',async function(req,res,next){
    const id = req.params.id;
    try {
     const result = await Product.findByIdAndDelete(id)
     console.log(result);
     res.send(result);
    } catch (error) {
      console.log(error.message)
    }
});



module.exports = router;
