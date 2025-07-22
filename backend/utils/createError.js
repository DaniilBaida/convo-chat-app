const createError = (message, errorStatus) => {
    const error = new Error(message);
    error.status = errorStatus;
    return error;
};

export default createError;
