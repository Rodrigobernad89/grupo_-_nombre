const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/productos', (req,res) =>{
    res.sendFile(__dirname + '/productos.html');
})

app.get('/carrito', (req,res)=>{
    res.sendFile(__dirname + '/carrito.html')
})

app.get('/registrarse', (req,res)=>{
    res.sendFile(__dirname + 'public/registrarse.html')
})


app.listen(3000, ()=> console.log('server corriendo'));