require('dotenv').config();

module.exports = {
  development: {
    username: "root",
    password: "",
    database: "Devops_test",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: "",
    database: "Devops_test",
    host: "localhost",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: "",
    database: "Devops_test",
    host: "localhost",
    dialect: "mysql"
  }
};