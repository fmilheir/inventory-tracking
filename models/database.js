const options = {
  bufferCommands: false, // this will disable the buffering
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,{});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Connected')
});

// Models
require('./User');
require('./Data')
