module.exports = (router) => {
    router.use((err, req, res, next) => {
        res.status(err.status);
        res.json({
            code: err.status,
            message: err.message
        });
        return;
    });
};
