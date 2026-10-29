const cl = console.log;

const express = require('express')
const {app} = require("./app")

const port = 3500

app.listen(port, ()=>{
    cl(`server is running on port ${port}`)
})