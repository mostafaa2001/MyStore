var express = require('express');
var path = require('path');
var fs = require('fs'); //used to read data from a file
const { mainModule } = require('process');
const { checkPrime } = require('crypto');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var validator = require('express-validator');
var flash = require('express-flash');
const { Console } = require('console');
const { compile } = require('ejs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));/*telling the server that the htmnl file(s) are found in the view  folder*/
app.set('view engine', 'ejs');/*telling the server to handle it as ejs not just normal html*/


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));/*telling the server where to find the static files (images,videos,css sheets..)*/ 
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());




app.get('/', function(req,res){   //So the '/' here is the hompage meaning that when the user requests the hpage we will execute this function if it was for example app.get('/user')then the user is requesting user page (HTML)
  res.render('login');//render means load the html file for the user
});
app.get('/registration',function(req,res){



  res.render('registration');
});
app.get('/register',function(req,res){


  res.render('login');
});
app.get('/books',function(req,res){
  if(!req.session.loggedIn){
    res.redirect('/')
  }
  else
  res.render('books')
});
app.get('/boxing',function(req,res){
  if(!req.session.loggedIn){
    res.redirect('/')
  }
  else
  res.render('boxing')
});
app.get('/galaxy',function(req,res){
  if(!req.session.loggedIn){
    res.redirect('/')
  }
  else
  res.render('galaxy')
});
app.get('/home',function(req,res){
  if(!req.session.loggedIn){
    res.redirect('/')
  }
  else
  res.render('home')
});
app.get('/iphone',function(req,res){
  if(!req.session.loggedIn){
    res.redirect('/')
  }
  else
  res.render('iphone')
  
});
app.get('/login',function(req,res){
  if(!req.session.loggedIn){
    res.redirect('/')
  }
  else
  res.render('login')
  
});

// // app.get('/not_found',function(req,res){
// //   res.render('not_found')
  
// });
app.get('/leaves',function(req,res){
  if(!req.session.loggedIn){
    res.redirect('/')
  }
  else
  res.render('leaves')
});
app.get('/phones',function(req,res){
  res.render('phones')
});
app.get('/searchresults',function(req,res){
  if(!req.session.loggedIn){
    res.redirect('/')
  }
  else
  res.render('searchresults')
});
app.get('/sports',function(req,res){
  if(!req.session.loggedIn){
    res.redirect('/')
  }
  else
  res.render('sports')
});
app.get('/sun',function(req,res){
  if(!req.session.loggedIn){
    res.redirect('/')
  }
  else
  res.render('sun')
});
app.get('/searchresults',function(req,res){
  if(!req.session.loggedIn){
    res.redirect('/')
  }
  else
  res.render('searchresults')
});
// app.get('/register',function(req,res){
//   res.render('register')
// });

app.get('/tennis',function(req,res){
  if(!req.session.loggedIn){
    res.redirect('/')
  }
  else
  res.render('tennis')
});



async function database(){
  var {MongoClient} = require('mongodb');
  var mongourl = "mongodb://mystore:mystore@cluster0-shard-00-00.f7uq6.mongodb.net:27017,cluster0-shard-00-01.f7uq6.mongodb.net:27017,cluster0-shard-00-02.f7uq6.mongodb.net:27017/MyStoreDB?ssl=true&replicaSet=atlas-8oz8fi-shard-0&authSource=admin&retryWrites=true&w=majority"
  var client = new MongoClient(mongourl,{useNewUrlParser: true, useUnifiedTopology: true});
  await client.connect();
  // await client.db('MyStoreDB').createCollection('USERS');
//  var user ={username:"sasa",cart:"iphone"};
//  await client.db('MyStoreDB').collection('MyStoreCDB').insertOne(user);
 var data = await client.db('MyStoreDB').collection('USERS').find().toArray();//retrieving my data into array in order to access the data
//  console.log(data[0].username);
//  var prod = {item:'tennis'};
//  await client.db('MyStoreDB').collection('ITEMS').insertOne(prod);
//  var data2 = await client.db('MyStoreDB').collection('ITEMS').find().toArray();

//  var buy = {username:"sasa",items:["iphone",""]};
//  await client.db('MyStoreDB').collection('CART').insertOne(buy);
 var data3 = await client.db('MyStoreDB').collection('CART').find().toArray();
//  await client.db('MyStoreDB').collection('CART').drop();

app.post('/register',async function(req,res){
  await client.connect();
  var username = req.body.username;
  var password = req.body.password;
  var new_user = {username:username,password:password}
  
 

if(new_user.password == "" ||  new_user.username == "")
{
  req.flash('error',"Fill in empty blanks !!")
  res.redirect('registration');
}
else{
  let i =0;
  let j =0;
  while(i<data.length){
    if(new_user.username==data[i].username){
    j++;
    i++;
    }
    else{i++}
  }
  if(j>0){

     req.flash('error1',"User already exist try loging in");
    res.redirect('registration');
  }
  else
  {
    await client.db('MyStoreDB').collection('USERS').insertOne(new_user);
    data = await client.db('MyStoreDB').collection('USERS').find().toArray();
    add_to_cart();
    req.flash('success',"Registration is Succesful!")

    res.redirect('registration');
  }
}
async function add_to_cart(){
  var cart_obj = {user:new_user.username,item:[]}
   await client.db('MyStoreDB').collection('CART').insertOne(cart_obj);
   data3 = await client.db('MyStoreDB').collection('CART').find().toArray();
}

});

app.post('/',async function(req,res){
  await client.connect();
  var username = req.body.username;
  var password = req.body.password;
  var new_user = {username:username,password:password}
 var x = new_user.username;//3mltaha 34an lMa b3ml new_user.user kan bygbhali 8lt hna bygbha sa7 fa ha5odha mn hna
if(new_user.password == "" ||  new_user.username == "")
{
  req.flash('error2',"Fill in empty blanks !!")

  res.redirect('/');
}
else{
  let i =0;
  let j =0;
  while(i<data.length){
    if(new_user.username==data[i].username && new_user.password==data[i].password){
    j++;
    i++;
    }
    else{i++}
  }
  if(j>0){
  
    req.session.loggedIn=true;
    console.log(req.session.loggedIn)
    req.session.username= new_user.username;
    res.redirect('home');   
    
  }
  else
  {
    req.flash('error2',"Incorrect username or password")

    res.render('login');
  }
}
// console.log(new_user.username);

// async function add_to_cart(){
//   var cart_obj = {user:req.session.username,item:[]}
//    await client.db('MyStoreDB').collection('CART').insertOne(cart_obj);
//    data3 = await client.db('MyStoreDB').collection('CART').find().toArray();

// }
let v= 0;
let k=0;
while(v<data.length){
if(data[k].username != new_user.username){
  k++;
  v++;
}
else break;
}
app.post('/iphonecart',async function(req,res){
  await client.connect();
  data3 = await client.db('MyStoreDB').collection('CART').find().toArray();

  let i =0
  let j=0
  let f= 0
  while(i<data3.length){
  if(data3[i].user==req.session.username){
   
    break;
  }
  else{
    i++
  }
}
while(j<data3[i].item.length){
  if(data3[i].item[j].name=="iphone"){
          f++;
      req.flash('itemAlereadyThere',"Item already in Cart");
      break;

  }
  else j++
}
    if(f==0){
        
          // data3[i].item.push("iphone");
          await client.db('MyStoreDB').collection('CART').updateOne({
            user:req.session.username
          },
          {
            $push:
            {
             item :  {name:"iphone"}
            }
          })
          console.log("updated");
          return res.redirect('iphone');
        }
        else{
          res.redirect('iphone');
        }

        
      
 
  
});

data3 = await client.db('MyStoreDB').collection('CART').find().toArray();

app.post('/galaxycart',async function(req,res){
  await client.connect();
  data3 = await client.db('MyStoreDB').collection('CART').find().toArray();

  let i =0
  let j=0
  let f= 0
  while(i<data3.length){
  if(data3[i].user==req.session.username){
   
    break;
  }
  else{
    i++
  }
}
while(j<data3[i].item.length){
  if(data3[i].item[j].name=="galaxy"){
          f++;
      req.flash('itemAlereadyThere',"Item already in Cart");
      break;

  }
  else j++
}
    if(f==0){
        
          // data3[i].item.push("iphone");
          await client.db('MyStoreDB').collection('CART').updateOne({
            user:req.session.username
          },
          {
            $push:
            {
             item :  {name:"galaxy"}
            }
          })
          console.log("updated");
          return res.redirect('galaxy');
        }
        else{
          res.redirect('galaxy');
        }

        
      
  
});
data3 = await client.db('MyStoreDB').collection('CART').find().toArray();


app.post('/leavescart',async function(req,res){
  await client.connect();
  data3 = await client.db('MyStoreDB').collection('CART').find().toArray();

  
  let i =0
  let j=0
  let f= 0
  while(i<data3.length){
  if(data3[i].user==req.session.username){
   
    break;
  }
  else{
    i++
  }
}
while(j<data3[i].item.length){
  if(data3[i].item[j].name=="leaves"){
          f++;
      req.flash('itemAlereadyThere',"Item already in Cart");
      break;

  }
  else j++
}
    if(f==0){
        
          // data3[i].item.push("iphone");
          await client.db('MyStoreDB').collection('CART').updateOne({
            user:req.session.username
          },
          {
            $push:
            {
             item :  {name:"leaves"}
            }
          })
          console.log("updated");
          return res.redirect('leaves');
        }
        else{
          res.redirect('leaves');
        }

        
      
  
});
data3 = await client.db('MyStoreDB').collection('CART').find().toArray();


app.post('/suncart',async function(req,res){
  await client.connect();
  data3 = await client.db('MyStoreDB').collection('CART').find().toArray();

  
  let i =0
  let j=0
  let f= 0
  while(i<data3.length){
  if(data3[i].user==req.session.username){
   
    break;
  }
  else{
    i++
  }
}
while(j<data3[i].item.length){
  if(data3[i].item[j].name=="sun"){
          f++;
      req.flash('itemAlereadyThere',"Item already in Cart");
      break;

  }
  else j++
}
    if(f==0){
        
          // data3[i].item.push("iphone");
          await client.db('MyStoreDB').collection('CART').updateOne({
            user:req.session.username
          },
          {
            $push:
            {
             item :  {name:"sun"}
            }
          })
          console.log("updated");
          return res.redirect('sun');
        }
        else{
          res.redirect('sun');
        }

        
  
});
data3 = await client.db('MyStoreDB').collection('CART').find().toArray();


app.post('/boxingcart',async function(req,res){
  await client.connect();
  data3 = await client.db('MyStoreDB').collection('CART').find().toArray();
  let i =0
  let j=0
  let f= 0
  while(i<data3.length){
  if(data3[i].user==req.session.username){
   
    break;
  }
  else{
    i++
  }
}
while(j<data3[i].item.length){
  if(data3[i].item[j].name=="boxing"){
          f++;
      req.flash('itemAlereadyThere',"Item already in Cart");
      break;

  }
  else j++
}
    if(f==0){
        
          // data3[i].item.push("iphone");
          await client.db('MyStoreDB').collection('CART').updateOne({
            user:req.session.username
          },
          {
            $push:
            {
             item :  {name:"boxing"}
            }
          })
          console.log("updated");
          return res.redirect('boxing');
        }
        else{
          res.redirect('boxing');
        }

        
      
 
});
data3 = await client.db('MyStoreDB').collection('CART').find().toArray();


app.post('/tenniscart',async function(req,res){
  data3 = await client.db('MyStoreDB').collection('CART').find().toArray();
  await client.connect();
  let i =0
  let j=0
  let f= 0
  while(i<data3.length){
  if(data3[i].user==req.session.username){
   
    break;
  }
  else{
    i++
  }
}
while(j<data3[i].item.length){
  if(data3[i].item[j].name=="tennis"){
          f++;
      req.flash('itemAlereadyThere',"Item already in Cart");
      break;

  }
  else j++
}
     
 if(f==0){       
          // data3[i].item.push("iphone");
          await client.db('MyStoreDB').collection('CART').updateOne({
            user:req.session.username
          },
          {
            $push:
            {
             item :  {name:"tennis"}
            }
          })
          console.log("updated");
          return res.redirect('tennis');
        }
        else{
          res.redirect('tennis');
        }

        
      
 
});
data3 = await client.db('MyStoreDB').collection('CART').find().toArray();

app.get('/cart',async function(req,res){
  await client.connect();
  if(!req.session.loggedIn){
    res.redirect('/');
  }
 
  else{
  let i =0;
  while(i<data3.length){
    if(data3[i].user!=req.session.username){
     i++
   

    }
    else
    break;
  }
  data3 = await client.db('MyStoreDB').collection('CART').find().toArray();
res.render('cart',{
  itemName : data3[i].item
});
  }

  
});
app.post('/search',async function(req,res){
  let items = [{name:"iPhone 13 Pro",link:"iphone"},
  {name:"Galaxy S21 Ultra",link:"galaxy"},
  {name:"Leaves of Grass",link:"leaves"},
  {name:"The Sun and Her Flowers",link:"sun"},
  {name:"Tennis Racket",link:"tennis"},
  {name:"Boxing Bag",link:"boxing"}]
  let results = [];
  for(let i =0;i<items.length;i++){
    if(items[i].name.toLowerCase().includes(req.body.Search)){
      results.push(items[i]);
    }
  }
  res.render('searchresults',{
    result:results
  });
});
// console.log(data3[0].user);
// console.log(x);


});





  client.close();
}
database().catch(console.error);









if(process.env.PORT){
  app.listen(process.env.PORT,function(){
    console.log("server started")
});
}
else{
app.listen(3000,function(){
  console.log("heard on 3000");
});
}