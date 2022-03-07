import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please Provide a name'],
        maxlength: 100
    },
    description:{
        type:String,
        required:[true, 'Please Provide a description'],
    },
    Quantity: {
        type:Number,
        required:[true, 'Please Provide QTY'],
    },
    SKU: {
        type:String,
        required:[true, 'Please Provide SKU'],
    },
    imgURL: {
        type:Array,
        required:[true, 'Please Provide Image']
    },
    likedBy: {
        type:Array,
    }
    
}, {timestamps:true})

export default mongoose.model('product', productSchema);