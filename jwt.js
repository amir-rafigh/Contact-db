// import jwt from "jsonwebtoken"
const jwt = require("jsonwebtoken")
const Secret_Token = "a;dlkjfoaija09e%#$^$#welkjdasfdl"
const Token = jwt.sign({Email:"amir10.rafigh@gmail.com"},Secret_Token , {expiresIn:"2year"})
console.log(Token);
