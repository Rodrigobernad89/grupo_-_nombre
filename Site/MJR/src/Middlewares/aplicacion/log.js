module.exports = function(req,res,next){
    res.locals.user = false;
    res.locals.rolsession = false;

    if (req.session.user) {
        res.locals.user = req.session.user;
        res.locals.rolsession = req.session.rolsession;
    }else if (req.cookies.recordame){
        req.session.user = req.cookies.recordame;
        res.locals.user = req.session.user;
        res.locals.rol = req.session.rolsession;
    }
    next();
}