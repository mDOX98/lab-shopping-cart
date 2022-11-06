const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const { equal } = require('assert');

const app = express();


// parse application.x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.listen(3000, () => console.log('Server listening on port 3000!'));

var products = [
    {id: '0', name: "Bananas", price: 3},
    {id: '1', name: "Apples", price: 1.4},
    {id: '2', name: "Grapes", price: 1},
    {id: '3', name: "Oranges", price: 2.39},
    {id: '4', name: "Sauce", price: 5.99}
]; // {id: (string), name: (string), price: (string)}
var cart = []; // {id: (string), quantity: (string)}

// ---Products API---

app.get('/api/products', (req, res) => {
    res.send(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(element => element.id === req.params.id);
    res.send(product);
});

app.post('/api/products', (req, res) => {
    let id = -1;
    while (true){
        id = crypto.randomUUID();
        let uniqueId = true;
        for (const i of products){
            if (i.id == id) {
                uniqueId = false;
            }
        }
        if(uniqueId){break;}
    }  // verify unique ID
    
    let item = {
        id: id,
        name: req.body.name,
        price: req.body.price
    };
    
    products.push(item);
    res.send(item);
});

app.delete('/api/products/:id', (req, res) => {
    products = products.filter(function(value, index, arr){
        return value.id != req.params.id
    });
    res.sendStatus(200);
});



// ---Shopping Cart API---

app.get('/api/cart/', (req, res) => {
    res.send(cart);
});

app.get('/api/cart/:id', (req, res) => {
    const cartItem = cart.find(element => element.id === req.params.id);
    res.send(cartItem);
});

app.post('/api/cart/:id', (req, res) => {
    
    let cartItemName = products.find(element => element.id == req.params.id).name;

    let item = {
        id: req.params.id,
        name: cartItemName,
        quantity: 1
    };

    let cartItem = cart.find(element => element.id == req.params.id);
    
    if (cartItem != undefined){
       cartItem.quantity =  parseInt(cartItem.quantity) + item.quantity;
        res.send(cartItem);
    } else {
        cart.push(item);
        res.send(item);
    }
    
});

app.put('/api/cart/:id/:quantity', (req, res) => {

    let cartItem = cart.find(element => element.id == req.params.id);
    if(cartItem == undefined){
        res.sendStatus(404);
        return;
    }

    cartItem.quantity = parseInt(req.params.quantity);
    //console.log(`requested = ${parseInt(req.params.quantity)} current ${cartItem.quantity}`);

    if (cartItem.quantity == 0){
        cart = cart.filter(function(value, index, arr){
            return value.id != req.params.id;
        });
    }
    res.send(cartItem);
});

app.delete('/api/cart/:id', (req, res) => {
    cart = cart.filter(function(value, index, arr){
        return value.id != req.params.id
    });
    res.sendStatus(200);
});