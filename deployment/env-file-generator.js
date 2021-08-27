/**
 * Google cloud secrets are loaded ins github action,
 * this file extracts those secrets, and creates the .env file
 * with KEY=VALUE pair for the application
*/
const fs = require('fs')

function extractSecretsToEnvFile(){
    if(process.argv.slice(2).length == 2){
        const environmentVariables = process.argv.slice(2)[0]
        const environmentPrefix = process.argv.slice(2)[1].toUpperCase()
        /**
         * Clear the file if any content exist
         */
        fs.writeFileSync('.env','')
        /**
         * Write the environment variables and values to file
         */
        environmentVariables.split(',').forEach(i => {
            const envVariableName =  i.trim()
            const secretName =`${environmentPrefix}_${envVariableName}` 
            const envVariableValue = process.env[secretName]
           
            fs.appendFileSync('.env', `${envVariableName}=${envVariableValue}`)
            fs.appendFileSync('.env', "\n")
        })
    }else{
        console.error("Two parameters expected as input, ex: node envFileGenerator 'PRODUCTION_NAME,PRODUCTION_REGION' 'PRODUCTION'")
    }
}

extractSecretsToEnvFile()