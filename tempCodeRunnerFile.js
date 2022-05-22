let express = require('express')

let app = express()

app.get('/api/user',(req,res)=>{
    res.json({name:'alkjdkfjddda大家放得开'})
})

app.listen(3000)