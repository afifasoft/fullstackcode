const mongoose = require('mongoose');
//const Schema = mongoose.Schema; //
const { Schema } = mongoose; // destructering - mongoose has Schema propery take that and assign it to Schema

const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema);
