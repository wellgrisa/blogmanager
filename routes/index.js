
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