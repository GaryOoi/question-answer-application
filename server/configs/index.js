// ### Sensitive file ###

module.exports = {
  DB_URI:
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/questionansweringsystem",
  BCRYPT_SALT_OR_ROUNDS: 10,
  JWT_SECRET: "questionanswering",
};
