# Steps to Building An App
* SetUp Directory
    * git init
    * npm init -y
    * install/require  dependecies
        * ```javascript
            npm install --save-dev
            ```
        * express, sequelize, body-parser, morgan, chalk, pg@6, nodemon, nunjucks
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

* Set Up index.js
    * declare accessible folders
        * ```javascript
            app.use(express.static('public'));
          ```
    * set up middleware
        * ```javascript
            app.use(morgan('dev'));
        ```
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
        
    

        
        