const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = {

 title: String,

 content: String

};

const Post = mongoose.model("Post", postSchema);



const homeStartingContent = "A blog (a truncation of weblog) is a discussion or informational website published on the World Wide Web consisting of discrete, often informal diary-style text entries (posts). Posts are typically displayed in reverse chronological order, so that the most recent post appears first, at the top of the web page.";
const aboutContent = "Website for Blogging!";
const contactContent = "Email id: rajneeshpandey1708@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

//GET

app.get('/', function(req, res) {
  Post.find({}, function(err, posts){
    res.render("home", {
      homeStartText: homeStartingContent,
      posts: posts
      });
  });

});

app.get('/about', function(req, res) {
  res.render('about', {
    aboutStartText: aboutContent
  })
})

app.get('/contact', function(req, res) {
  res.render('contact', {
    contactStartText: contactContent
  })
})

app.get('/compose', function(req, res) {
  res.render('compose')
})


app.get('/posts/:postId', function(req, res) {
  const requestedPostId = req.params.postId;
Post.findOne({_id: requestedPostId}, function(err, post){
  res.render("post", {

    title: post.title,

    content: post.content

  });
});

});

//post

app.post('/compose', function(req, res) {

  const post = new Post ({

  title: req.body.titleToPublish,

  content: req.body.textToPublish

});
post.save(function(err){

   if (!err){

     res.redirect("/");

   }
 });

  res.redirect('/');
})





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
