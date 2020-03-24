module.exports.home = function(req,res){
    res.render('home',{
        title: "home"
    });
}

console.log('controller loaded');