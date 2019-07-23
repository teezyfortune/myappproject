const express= require('express');
const path = require('path');
const bcrypt= require('bcrypt')

const verifyPassword =(password, hashPassword)=>{
return bcrypt.compareSync(password, hashPassword);
}




module.exports={
    verifyPassword
}
