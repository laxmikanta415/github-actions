console.log(process.env)
const fs = require('fs')
const environmentVariables = process.argv.slice(2)[0]
environmentVariables.split(',').forEach(i => {
    console.log(i.trim())
    fs.appendFileSync('.env', `${i.trim()}=${process.env[i.trim()]}`)
    fs.appendFileSync('.env', "\n")
})

