const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    unique: true,
    required: true
},
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  password: { 
    type: String, 
    required: true },
  
  gender:  { 
      type: String, 
      required: true,
      enum: ['male', 'female'], 
    }
  
});

// before save
UserSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
})

UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}



const UserModel = mongoose.model('users', UserSchema);

module.exports =  { UserModel }; 