'use strict'
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const express = require('express');
const chalk = require('chalk');
const app = express();


app.use(morgan('dev'));
app.use(express.static('public'));


app.get('/', (req, res, next) => {
    res.send('it works');
})



const PORT = 3000;


app.listen(PORT, () => {
    console.log(chalk.blue(`Listening on PORT: ${PORT}`))
})
