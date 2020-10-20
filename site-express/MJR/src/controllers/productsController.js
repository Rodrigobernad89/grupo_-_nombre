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
}

module.exports = controller;
