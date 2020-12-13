module.exports = function(req,res,next){
    res.locals.user = false;

    if (req.session.user) {
        res.locals.user = req.session.user;
    }else if (req.cookies.recordame){
        req.session.user = req.cookies.recordame;
        res.locals.user = req.session.user;
    }
    next();
}