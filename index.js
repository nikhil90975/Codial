const express = require('express');
const app = express();
const port = 8000;
//cghhvbkjnm
app.listen(port,function(err){
    if(err){
        //interpolation-include variable inside string
        console.log(`Error in running surver: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});