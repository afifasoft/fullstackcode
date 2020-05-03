const express = require('express');
const mongoose = require('mongoose');
require('./services/passport');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

const app = express();

// 35
//const authRoutes = require('./routes/authRoutes');
//authRoutes(app);
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
