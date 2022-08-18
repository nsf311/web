const { readUserPwd } = require("./db_pwd");
pwd = readUserPwd;
url_str = "mongodb://readUser:" + pwd + "@34.134.26.155:27017/boston311";
module.exports = {
  url: url_str,
  // url:'mongodb://127.0.0.1/boston311'
};
