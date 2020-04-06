const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts= require('express-ejs-layouts');
//database
const db = require('./config/mongoose');
//express-session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//persistent storage for cookie
const MongoStore = require('connect-mongo')(session);
//scss
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded());
//cookie
app.use(cookieParser());
//static file
app.use(express.static('./assets'));

//layouts
app.use(expressLayouts);

//extract styles and script from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//set up view engine
app.set('view engine','ejs');
app.set('views','./views');


//mongo store is used to store the session cookie in the db
app.use(session({
    name:'Codial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized:false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection:  db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());


//middleware for (whenever passport is initialised and session is used..authenticated user is set)
app.use(passport.setAuthenticated);
//use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        //interpolation-include variable inside string
        console.log(`Error in running surver: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});