import { StatusCodes } from 'http-status-codes';
import badRequestError from '../errors/badRequest.js';
import notFoundError from '../errors/notFound.js';
import Product from '../model/Products.js';


//Get All Products
export const getAllProducts = async (req, res) => {
    const {name, id} = req.query;
    const queryObject = {};
   
    //finding by title if needed
    if(name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }
    console.log(name)
    //Finding only the current user's products If needed
    if(id) {
        queryObject.createdBy = id;
       }

    let data = Product.find(queryObject);



    const products = await data;    
    
    //Getting total no of Products
    const noOfProducts = await Product.find(queryObject).count();
   
    res.status(StatusCodes.OK).json({products, noOfProducts});
}

//Create Product
export const createProduct = async (req, res) => {
    const product = await Product.create(req.body);    
    res.status(StatusCodes.CREATED).json({product});
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
