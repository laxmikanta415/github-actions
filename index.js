const express = require('express')
const app = express()
app.use('/', (req, res) =>{
  res.status(200).json({
  "name": process.env.NAME,
  "region": process.env.REGION
  })
})
app.listen(8080,function(){
  console.log('running on 8080')
})
