import { StatusCodes } from 'http-status-codes';
import badRequestError from '../errors/badRequest.js';
import notFoundError from '../errors/notFound.js';
import Product from '../model/Products.js';


//Get All Products
export const getAllProducts = async (req, res) => {
    const {name, isLiked} = req.query;
    const queryObject = {};
   
    //finding by title if needed
    if(name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }
    let data;

    //Query according to if the product is favrt or not if requested 
    if(isLiked === 'yes') {
        data = Product.find( {"likedBy": { $size: 1 }});
       }  else data = Product.find(queryObject);
    

    const products = await data;    
    
    //Getting total no of Products
    const noOfProducts = await Product.find(queryObject).count();
    
   //Finding only the liked products If needed
    

    res.status(StatusCodes.OK).json({products, noOfProducts});
}

//Create Product
export const createProduct = async (req, res) => {
    console.log(req.file)    
    console.log(req.body)     
    res.status(StatusCodes.CREATED).send('file received');
}

//Update Product
export const updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate({_id: req.params.id},
        req.body, {new: true, runValidations:true});
    if(!product) {
        throw new notFoundError('Product not found');
    }
    res.status(StatusCodes.OK).json({product});
}

//Delete Product
export const deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete({_id: req.params.id});
    if(!product) {
        throw new notFoundError('Product not found');
    }
    res.status(StatusCodes.OK).send();
}

//Update single element in array(adding like)
export const addLike = async (req, res) => {                                 //addtoSet won't add duplicate values none like $push. In this way same user can't like a post twice              
    const post = await Product.findByIdAndUpdate({_id: req.params.id}, {$addToSet:{likedBy: "liked"}},{new: true, runValidations:true});
    res.status(StatusCodes.OK).json({post});
}   

//removing single element in array(removing like)
export const removeLike = async (req, res) => {
    const post = await Product.findByIdAndUpdate({_id: req.params.id}, {$pull:{likedBy: "liked"}}, {new: true, runValidations:true});
    res.status(StatusCodes.OK).json({post});
}
