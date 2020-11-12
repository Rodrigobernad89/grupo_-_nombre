const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../database/db_products.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const controller = {
    index: (req, res) => {
        res.render('index');
      },
      search: (req, res) => {
        const search =req.body.busqueda;
        var ExpReg = new RegExp(search,'i');
       
       const products=productos.filter(p=>{
         console.log(p.nombre_producto)
         return  ExpReg.test(p.nombre_producto) == true
       })
      
      res.render('products/search',{products})
      }
      
}

module.exports = controller;
