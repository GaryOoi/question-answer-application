const mongoose = require('mongoose');

const { createPasswordHashingPreSaveHook } = require('../../utils/db');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  jwtValidId: { type: String, required: true },
});

UserSchema.pre('save', createPasswordHashingPreSaveHook('password'));

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
