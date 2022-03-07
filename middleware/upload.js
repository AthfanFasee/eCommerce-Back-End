import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';
import crypto from 'crypto';
import path from 'path';

const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    options: {useNewUrlParser:true, useUnifiedTopology:true},
    file: (req,file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if(err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'image'
                }
                resolve(fileInfo);
            })
        })       
    }
});
const upload = multer({storage})
export default upload; 
