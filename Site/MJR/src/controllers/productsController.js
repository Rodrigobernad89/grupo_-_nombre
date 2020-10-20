const controller = {
    index: (req, res) => {
        res.render('products/productos');
      },
    detail: (req, res) => {
        res.render('products/detalle-producto');
    },
    cart:(req, res) => {
        res.render('products/carrito');
    },
    create:(req,res) => {
        res.render('products/formulario-creacion');
    },
    edit:(req,res) => {
        res.render('products/formulario-editar');
    },
}

module.exports = controller;
