import {StatusCodes} from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
    //Setting default error values
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong'
    }

    //If wrong format or syntax of id provided in link (Cast Error)
    if(err.name === 'CastError') {
        customError.statusCode = StatusCodes.NOT_FOUND;
        customError.msg = `No item found with id ${err.value}`;
    }


    return res.status(customError.statusCode).json({msg: customError.msg});
}


export default errorHandlerMiddleware;