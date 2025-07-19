export const errorMiddleware = (err, req, res, next) => {
    if (err.name === "CastError") {
        err.message = "Resource not found";
        err.status = 404;
    }

    if (err.code === 11000) {
        err.message = "Duplicate field value error";
        err.status = 400;
    }

    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(
            (returnedError) => returnedError.message
        );
        err.message = message.join(", ");
        err.status = 400;
    }

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Server Error",
    });
};
