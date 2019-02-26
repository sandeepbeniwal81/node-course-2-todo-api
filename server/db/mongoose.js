var mongoose = require('mongoose');
//var mongoose.Promise = global.Promise;
//Set useFindAndModify and useNewUrlParser to remove deprecation warnings
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true)


mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};