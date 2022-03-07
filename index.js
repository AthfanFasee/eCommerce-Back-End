import express from 'express';
import cors from 'cors';
import helmet from 'helmet'
import xss from 'xss-clean';
import 'express-async-errors';
import rateLimiter from 'express-rate-limit';
import 'dotenv/config';
import notFound from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import connect from './db/connect.js';
import ProductRouter from './routes/products.js';
import Grid from 'gridfs-stream';
import mongoose from 'mongoose';
import methodOverride from 'method-override';


const app = express();
app.use(express.json());
app.use(methodOverride('_method'));

//Init gfs
let gfs
const conn = mongoose.connection;

conn.once('open', () => {
  //Init stream
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection('uploads');
})


//Extra security pacakages
app.use(cors());
app.use(helmet());
app.use(xss());

app.get('/', (req, res) => {
  res.send('Deployed')
})

//Routes
app.use('/api/v1/products', ProductRouter);




//Error Handler
app.use(errorHandlerMiddleware);

//NotFound 
app.use(notFound);

//Setting up Server
const port = process.env.PORT || 4000;
const start = async () => {
  await connect(process.env.MONGO_URI);
  app.listen(port, console.log('Server Upp'));
}
start();
