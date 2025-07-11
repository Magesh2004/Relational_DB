const  winston= require('winston')

const{timestamp,combine,prettyPrint,json,errors}= winston.format

const logger = winston.createLogger({
    level:"info",
    format:combine(
        errors({stack:true}),
        timestamp(),
        json(),
        prettyPrint()
    ),
    transports:[
        new winston.transports.File({filename:'index.log'})
    ]
})


module.exports = logger

