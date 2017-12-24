'use strict';
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const Repository = require('./Data/Repository').RepositoryAsArray;
const RepositoryAsDict = require('./Data/Repository').RepositoryAsDict;
var cookieParser = require('cookie-parser');


/* Middleware config */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('Public'));
app.engine('.hbs', handlebars({ extname: '.hbs' }));
app.set('view engine', '.hbs');
/* End of Middleware config */


/* Serving Static Pages */
app.get('/', (req, res) => res.render('Index'));
app.get('/menu', (req, res) => res.render('Menu'));
app.get('/locations', (req, res) => res.render('Locations'));
app.get('/checkout', (req, res) => res.render('Checkout'));
/* End of Serving Static Pages */



app.get('/items/get', (req, res) => res.send(Repository));



app.get('/shoppingcart/get', function (req, res) {
    if (req.cookies.shoppingCartItems == null)
    {
        res.cookie('shoppingCartItems', []);
        res.send([]);
    }
    else
    {
        const shoppingCartItems = req.cookies.shoppingCartItems;

        /*Item formatted for sending to get request as [ {Name, Price, Type, MealType, FoodID}, .....] */
        const itemsFormatted = shoppingCartItems.map(elem => {
            const item = RepositoryAsDict[elem];
            item.FoodID = elem;
            return item;
        })
        res.send(itemsFormatted);
    }
});


app.post('/shoppingcart/add', function (req, res) {
    try
    {
        console.log(req.body);
        const item = req.body.FoodID;
        if (item == null)
        {
            res.send('item recieved was null');
            return;
        }
        var shoppingCartItems = req.cookies.shoppingCartItems;
        if (shoppingCartItems == null)
            shoppingCartItems = [];
        shoppingCartItems.push(item);
        res.cookie('shoppingCartItems', shoppingCartItems);
        res.send('success');
    }
    catch (e)
    {
        console.log(e);
        res.send('failed :(');
    }
});



app.listen(80);
