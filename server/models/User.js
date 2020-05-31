const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
// destructering - mongoose has Schema propery take that and assign it to Schema
const { Schema } = mongoose;
const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema);
