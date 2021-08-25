const express = require('express')
const app = express()
require('dotenv').config()
app.use('/', (req, res) =>{
  let response = {
    dummy:'go'
  };
  try{
    response =   {
      "script":'server',
      "name": process.env.NAME,
      "region": process.env.REGION,
      "var":process.env.MY_VAR
    }
    console.log(process.env)
  }catch(err){
    console.log(err)
  }
  res.status(200).json(response)
})
app.listen(8080,function(){
  console.log('running on 8080')
})
