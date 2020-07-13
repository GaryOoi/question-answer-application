// ### Sensitive file ###

module.exports = {
  DB_URI:
    'mongodb+srv://cyworld:qwertyuiop.123@cluster0.nixul.mongodb.net/questionansweringsystem?retryWrites=true&w=majority' ||
    // process.env.MONGODB_URI ||
    'mongodb://localhost:27017/questionansweringsystem',
  BCRYPT_SALT_OR_ROUNDS: 10,
  JWT_SECRET: 'questionanswering',
};
