'use strict';
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
var cookieParser = require('cookie-parser');

const Repository = [
    { Name: 'Cherry Cake', Price: '', Type: 'Food', FoodID: 'F000', MealType: 'Dessert' },
    //{ Name: 'Blueberry X', Price: '', Type: 'Food', FoodID: 'F001', MealType: 'Snack' },
    { Name: 'Homemade Cake', Price: '', Type: 'Food', FoodID: 'F002', MealType: 'Dessert' },
    { Name: 'Chocalate Pancakes', Price: '', Type: 'Food', FoodID: 'F003', MealType: 'Breakfast' },
    { Name: 'Plain Pancakes', Price: '', Type: 'Food', FoodID: 'F004', MealType: 'Breakfast' },
    { Name: 'Baked Duck', Price: '', Type: 'Food', FoodID: 'F005', MealType: 'Dinner' },
    { Name: 'Grilled Salmon', Price: '', Type: 'Food', FoodID: 'F006', MealType: 'Dinner' },
    { Name: 'Grilled Meat', Price: '', Type: 'Food', FoodID: 'F007', MealType: 'Lunch' },
    //{ Name: 'Meat Kabab', Price: '', Type: 'Food', FoodID: 'F008', MealType: '' },
    { Name: 'Pepper Pizza', Price: '', Type: 'Food', FoodID: 'F009', MealType: 'Lunch' },
    //{ Name: 'Haiwainn Pizza', Price: '', Type: 'Food', FoodID: 'F010', MealType: '' },
    { Name: 'Pretzel Snack', Price: '', Type: 'Food', FoodID: 'F011', MealType: 'Dessert' },
    //{ Name: 'Spicy Salmon', Price: '', Type: 'Food', FoodID: 'F012', MealType: '' },
    { Name: '', Price: '', Type: 'Food', FoodID: 'F013', MealType: 'Lunch' },
    //{ Name: '', Price: '', Type: 'Food', FoodID: 'F014', MealType: '' },
    { Name: '', Price: '', Type: 'Food', FoodID: 'F015', MealType: 'Lunch' },
    { Name: '', Price: '', Type: 'Food', FoodID: 'F016', MealType: 'Dessert' },
    { Name: '', Price: '', Type: 'Food', FoodID: 'F017', MealType: 'Lunch' },
    { Name: '', Price: '', Type: 'Food', FoodID: 'F018', MealType: 'Dessert' },
    { Name: '', Price: '', Type: 'Food', FoodID: 'F019', MealType: 'Dessert' },
    { Name: '', Price: '', Type: 'Food', FoodID: 'F020', MealType: 'Breakfast' },
    { Name: '', Price: '', Type: 'Food', FoodID: 'F021', MealType: 'Lunch' },
    { Name: '', Price: '', Type: 'Food', FoodID: 'F022', MealType: 'Lunch' },
    //{ Name: '', Price: '', Type: 'Food', FoodID: 'F023', MealType: '' },
    { Name: '', Price: '', Type: 'Food', FoodID: 'F024', MealType: 'Dinner' },

    //{ Name: '', Price: '', Type: 'Food', FoodID: 'F014', MealType: '' },
    //{ Name: '', Price: '', Type: 'Food', FoodID: 'F015', MealType: '' },
    //{ Name: '', Price: '', Type: 'Food', FoodID: 'F016', MealType: '' },
    //{ Name: '', Price: '', Type: 'Food', FoodID: 'F017', MealType: '' },
    //{ Name: '', Price: '', Type: 'Food', FoodID: 'F018', MealType: '' },
    //{ Name: 'Oatmeal Parfait', Price: '', Type: 'Beverage', FoodID: 'T001', MealType: '' },
    { Name: 'Fruit Parfait', Price: '', Type: 'Beverage', FoodID: 'T002', MealType: 'Beverage' },
    //{ Name: 'Something Tea', Price: '', Type: 'Beverage', FoodID: 'T003', MealType: '' },
    //{ Name: 'Coffee', Price: '', Type: 'Beverage', FoodID: 'T004', MealType: '' },
    { Name: '', Price: '', Type: 'Beverage', FoodID: 'T005', MealType: 'Beverage' },
    //{ Name: '', Price: '', Type: 'Beverage', FoodID: 'T006', MealType: '' },
    { Name: '', Price: '', Type: 'Beverage', FoodID: 'T007', MealType: 'Beverage' },
    { Name: '', Price: '', Type: 'Beverage', FoodID: 'T008', MealType: 'Beverage' },
    { Name: '', Price: '', Type: 'Beverage', FoodID: 'T009', MealType: 'Beverage' },
    { Name: '', Price: '', Type: 'Beverage', FoodID: 'T010', MealType: 'Beverage' },
    //{ Name: '', Price: '', Type: 'Beverage', FoodID: 'T002', MealType: '' },


];
app.use(cookieParser());

app.use(express.static('Public'));

app.engine('.hbs', handlebars({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
    res.render('Index');
});

app.get('/menu', (req, res) => res.render('Menu'));

app.get('/repo', (req, res) => res.send(Repository));

app.get('/items/getAll', function (req, res) {
    res.cookie('shoppingCartItems', []);
    res.send(req.cookies);
})


app.post('/items/add', function (req, res) {
    try
    {
        const item = req.body.itemName; // in the form of {itemName: '', count: ''};
        const shoppingCartItems = req.cookies.shoppingCartItems;
        shoppingCartItems.push(item);
        res.send('success');
    }
    catch (e)
    {
        console.log(e);
        res.send('failed :(');
    }
});



app.get('/items', function (req, res) {
    res.send(req.cookies.shoppingCartItems);
});

app.listen(80);
