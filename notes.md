# Steps to Building An App

## Directory Tree
* SetUp Directory
    * git init
    * npm init -y
    * install/require  dependecies
        * ```javascript
            npm install --save-dev
            ```
        * express, sequelize, body-parser, morgan, chalk, pg@6, nodemon, nunjucks
        * write the npm start script in package.json
            *  "start": "nodemon index.js"

    * create Folders/Files
        * index.js
        * models
            * wiki.js
            * user.js
        * public - folder
            * stylesheets - folder
                * style.css
        * routes - folder
            * wiki.js
            * user.js
        * views - folder

## Index.js Setup
* Set Up index.js
    * declare accessible folders
        * ```javascript
            app.use(express.static('public'));
        * Pay attention to not making your views folder static
            * we set views to work with nunjucks and if you accidentally do express.static('views') IT WILL BREAK NUNJUCKS RENDERING
          
    * set up middleware
        * ```javascript
            app.use((error, req, res, next) => {
               
                error.status = error.status || 500;
                error.message = error.message || 'Internal Error';
                res.render('error', {error})
            });
        * or with a package like morgan
            * ```javascript
                app.use(morgan('dev'));
    * set up body-parse
        * ```javascript
                app.use(bodyParser.urlencoded({ extended: true }));
                app.use(bodyParser.json());
        
    * set up app.listen
        * ```javascript
            const PORT = 3000;
            app.listen(PORT, () => {
                console.log(chalk.blue(`Listening on PORT: ${PORT}`))
            })
        
    * configure app view engine & nunjucks rendering
        * ```javascript
                var env = nunjucks.configure('views', {noCache: true});
                app.set('view engine', 'html');
                app.engine('html', nunjucks.render);
## Initialize Sequelize
* Creating a DB
    * in terminal: createdb 'name'
* Create Models
    * require and initialize Sequelize
    * ```javascript
        var Sequelize = require('sequelize');
        var db = new Sequelize('postgres://localhost:5432/{your_db_name_here}', {logging: false});
    
    * DEFINE MODELS
       * see sequelize refernce for great model building
       * REMEMBER TO MODULES.EXPORT YOUR DB AND MODELS
    * Sync models and use a then chain for app.listen
        * ```javascript
            Owner.sync({ force: true })
                .then(() => {
                    return Dog.sync({ force: true })
                })
                .then(() => {
                    app.listen(PORT, () => {
                        console.log(chalk.cyan('-------------------------'));
                        console.log(chalk.blue(`Listening on PORT: ${PORT}`));
                        console.log(chalk.cyan('-------------------------'));
                    })
                })
        * If there are any relations between the models set up relations
            * use sequelize reference for models
            * IMPORTANT: Remember that if you sync table originally, then set up a relationship, use force:true on the next sync or else your relationship column (Ex: OwnerId) won't populate your table


## Error Handling with MiddleWare:
Basic Error handling using middleware

```javascript
    var express = require('express');
    var app = express();
    var router = express.Router();

    router.get('/',function(req,res) {
    res.send("Hello World!");
    });

    app.use('/',router);

    app.use(function(err,req,res,next) {
    console.log(err.stack);
    res.status(500).send({"Error" : err.stack});
    });

    app.listen(3000);
```

In Class Version of error handling:
```javascript
    app.use((error, req, res, next) => {            
            error.status = error.status || 500;
            error.message = error.message || 'Internal Error';
            res.render('error', {error})
        });
```
## Using Next() with middleware functions

Middleware functions have access to the request and response bodies and the next middleware function in the applications request-response cycle

* They Can:
    * Execute any code.
    * Make changes to the request and the response objects.
    * End the request-response cycle.
    * Call the next middleware function in the stack.

## Sequelize Methods Lookup
https://blog.cloudboost.io/docs-for-the-sequelize-docs-querying-edition-aed4bd1273f0

## Express middleware
using middleware
http://expressjs.com/en/guide/using-middleware.html

Writing middleware
https://expressjs.com/en/guide/writing-middleware.html

## FSA Sequelize Reference
https://github.com/bryanhclark/sequelize-reference






        

    

        
        