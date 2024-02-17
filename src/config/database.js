const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crud-nodejs')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));