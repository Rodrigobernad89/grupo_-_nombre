const controller = {
    index: (req, res) => {
        res.render('products/productos');
      },
    detail: (req, res) => {
        res.render('products/detalle-producto');
    },
}

module.exports = controller;