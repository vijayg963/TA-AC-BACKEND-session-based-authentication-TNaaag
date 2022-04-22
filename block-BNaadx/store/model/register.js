var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt');

var registerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, isAmin: false },
    password: { type: String, minlength: 5, required: true },
    phone: { type: Number, minlength: 10 },
  },
  {
    timestamps: true,
  }
);

registerSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    bcrypt.hash(this.password, 10, (err, hashed) => {
      if (err) return next(err);
      this.password = hashed;
      return next();
    });
  } else {
    next();
  }
});

// var admin = [
//   'vijayg963@gmail.com',
//   'user1@gmail.com',
//   'user2@gmail.com',
//   'user3@gmail.com',
// ];

// registerSchema.pre('save', function (next) {
//   admin.forEach((e) => {
//     if (this.email === e) {
//       isAmin === true;
//     } else {
//       isAmin == false;
//     }
//   });
// });

registerSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, result) => {
    return cb(err, result);
  });
};

const Register = mongoose.model('Register', registerSchema);

module.exports = Register;
