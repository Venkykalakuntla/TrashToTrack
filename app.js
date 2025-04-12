// app.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();



const dbUrl=process.env.ATLASDB_URI;

console.log(dbUrl);

const store= MongoStore.create({
    mongoUrl:dbUrl,
    crypto: {
        secret: process.env.SECRETE
      },
      touchAfter:24*3600
  })

  store.on("error",(err)=>{
    console.log("Error in mongo session store:",err)
  })

const sessionOptions={
    store,
    secret:process.env.SECRETE,
    resave:false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now()+1000*60*60*24*15,
        maxAge:1000*60*60*24*15,
        httpOnly:true,
    }
   };



mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(session(sessionOptions));


// Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const companyRoutes = require('./routes/company');
const wasteRoutes = require('./routes/waste');
const userRoutes = require('./routes/user');
app.use('/company', require('./routes/company'));




app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/company', companyRoutes);
app.use('/waste', wasteRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT||8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
