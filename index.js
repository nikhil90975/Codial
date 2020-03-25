const express = require('express');
const app = express();
const port = 8000;
const expressLayouts= require('express-ejs-layouts');

app.use(expressLayouts);
//use express router

app.use('/',require('./routes'));

//set up view engine
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        //interpolation-include variable inside string
        console.log(`Error in running surver: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});