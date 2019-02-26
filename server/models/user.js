const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ =require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email :{
        type: String,
        required: true,
        minlength: 10,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access:{
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]   
});

// UserSchema.methods.toJSON = function() {
//     var user = this.toObject();
//     delete user.password;
//     delete user.tokens;
//     return user;
// }

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();
    
    return _.pick(userObject,['_id','email']);
}

UserSchema.methods.generateAuthToken =  function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
    
    user.tokens = user.tokens.concat([{access, token}]);
    
    return token;
}

UserSchema.statics.findByToken = function(token) {
    var user = this;
    var decoded;

    try{
        decoded = jwt.verify(token.toString(), 'abc123');
    } catch (e) {
        return Promise.reject();
    }    

    // return User.findOne({'_id':decoded._id,
    // 'tokens.token': token,
    // 'tokens.access': 'auth'}, function (err, result) {
    //     if (err) {
    //       console.log(err);
    //     }
    //     console.log(result);
    //   }).catch((e) =>{
    //       console.log(e);
    //   });
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}

UserSchema.pre('save', function (next) {
    var user = this;
    
    if (user.isModified('password')){
        bcrypt.genSalt(10, (err, salt) =>{
            bcrypt.hash(user.password, salt, (err,hash) =>{
                user.password = hash;
                next();
            })
        })
    }else{
        next();
    }
})

var User = mongoose.model('User', UserSchema);

module.exports = {User};