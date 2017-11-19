'use strict'
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const express = require('express');
const models = require('./models/index');
const Page = models.Page;
const User = models.User;
const chalk = require('chalk');
const app = express();
var env = nunjucks.configure('views', { noCache: true });


app.use(express.static('public'));

//nunjucks rendering and other boiler plate
app.engine('html', nunjucks.render);
app.set('view engine', 'html');



app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res, next) => {
    res.render('index');
})





const PORT = 3000;
User.sync({ force: true })
    .then(() => {
        return Page.sync({ force: true })
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(chalk.cyan('-------------------------'));
            console.log(chalk.blue(`Listening on PORT: ${PORT}`));
            console.log(chalk.cyan('-------------------------'));
        })
    })

