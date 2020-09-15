const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));


app.get('/', (req,res) => {
    res.sendfile(__dirname + '/index.html');
})

app.get('/productos', (req,res) =>{
    res.sendfile(__dirname + '/productos.html');
})

app.get('/carrito', (req,res)=>{
    res.sendfile(__dirname + '/carrito.html')
})


app.listen(3000, ()=> console.log('server corriendo'));