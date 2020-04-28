var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/clothingSite', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

//Clothes Post schema here
var ClothesSchema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    date:{type:Date, default:Date.now},
    image:String,
    email:String,
    number:String
});

//Clothes model here
var Clothes = mongoose.model('Clothe',ClothesSchema);


Clothes.create({
    name:'Suit',
    description:'A black suit jacket with a white dress shirt made of 100% polyester and also ballistic fiber, it is very good at what it does and is very warm or cold if you want it to be but it is a very good pair overall please buy it off me. I\'ll sell it for $1 if you want, I really just don\'t want it anymore.',
    price:500,
    image:'https://images.unsplash.com/photo-1497339100210-9e87df79c218?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    email:'SuitGuy@suits.com',
    number:'123-456-7890'
},function(err, createdPost){
    if(err) {
        console.log(err);
    };    
})

//Index route
app.get('/posts', function(req,res){
    Clothes.find({}, function(err, foundPosts){
        if(err) {
            console.log(err);
        } else {
            res.render('index', {posts:foundPosts})
        }
    })
});

//Also index route
app.get('/', function(req,res){
    res.redirect('/posts');
});

//New route 
app.get('/posts/new', function(req,res){
    res.render('new');
});

//Also the new route
app.post('/posts', function(req,res){
    Clothes.create(req.body.post, function(err,createdPost){
        if(err){
            console.log(err);
        } else {
            res.redirect('/posts');
        }
    })
});

//Show route 
app.get('/posts/:id',function(req,res){
    var id = req.params.id;
    Clothes.findById(id, function(err, foundPost){
        if(err){
            console.log(err);
        } else {
            res.render('show', {post:foundPost});
        }
    })
});

//Edit route 
app.get('/posts/:id/edit', function(req,res){
    Clothes.findById(req.params.id, function(err, foundPost){
        if(err){
            console.log(err);
        } else {
            res.render('edit', {post:foundPost})
        }
    })
});

//Put route 
app.put('/posts/:id', function(req,res){
    Clothes.findByIdAndUpdate(req.params.id, req.body.post, function(err, editedPost){
        if(err) {
            console.log(err);
        } else {
            res.redirect('/posts/' + req.params.id);
        }
    });
});

//Delete route 
app.delete('/posts/:id', function(req,res){
    Clothes.findByIdAndDelete(req.params.id, function(err){
        if(err) {
            console.log(err);
        } else {
            res.redirect('/posts');
        };
    });
});

    
app.listen(3000, function(){
    console.log('Server is running');
});