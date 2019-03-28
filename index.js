const express = require('express');
const app =express();
app.get('/',(req,res)=>{
    res.send({welcome:'ARKHAM LOGGER'})
})

app.listen(5000);