
/*
 * GET home page.
 */

 exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.mainpage = function(req, res){
  res.render('mainpage', { title: 'Main Page will be held here!' });
};

exports.userlist = function(db) {
    return function(req, res) {
        var collection = db.get('person');
        collection.find({},{},function(e,docs){
            res.render('userlist', {
                "userlist" : docs
            });
        });
    };
};

exports.newuser = function(req, res){
    res.render('newuser', { title: "Add new person" })
}

exports.send = function(request, callback) {

}

exports.adduser = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var userName = req.body.name;
        var topic = req.body.topic;
        var sex = req.body.sex;
        var sector = req.body.sector;
        var week = req.body.week;
        var email = req.body.email;

        console.log(week);

        // Set our collection
        var collection = db.get('person');

        // Submit to the DB
        collection.insert({
            "name" : userName,
            "topic" : topic,
            "sex" : sex,
            "sector" : sector,
            "week" : week,
            "email" : email,
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, forward to success page
                res.redirect("userlist");
                // And set the header so the address bar doesn't still say /adduser
                res.location("userlist");
            }
        });

    }
}


var mailer = require('../app/mailers/base-mailer');
/**
 * Send Curriculum
 */
 exports.send = function(request, callback) {

  mailer.smtpTransport.sendMail({
    from: "wellington.grisa@gmail.com",
    to: "wellington.grisa@gmail.com",
    subject: "test",
    html: "abc"
    
    }, callback);

};