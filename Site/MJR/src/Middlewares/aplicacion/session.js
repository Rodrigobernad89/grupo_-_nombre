module.exports = function(req,res,next) {
    console.log("La sesion es: " + req.session.user);
    console.log("La rol: " + req.session.rolsession);
    next();
}