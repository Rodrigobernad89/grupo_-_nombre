const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.get('/productos', (req,res) =>{
    res.sendFile(__dirname + '/public/productos.html');
})

app.get('/carrito', (req,res)=>{
    res.sendFile(__dirname + '/public/carrito.html')
})

app.get('/registrarse', (req,res)=>{
    res.sendFile(__dirname + '/public/registrarse.html')
})

app.post('/registrarse', (req,res)=> {
    res.sendFile(__dirname + '/public/gracias.html');
})

app.get('/login', (req,res)=>{
    res.sendFile(__dirname + '/public/login.html')
})

app.post('/login', (req,res)=> {
    res.sendFile(__dirname + '/public/index.html');
})

app.listen(3000, ()=> console.log('server corriendo'));