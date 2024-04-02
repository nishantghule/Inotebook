const connectToMongo = require('./db');
const express = require('express');

connectToMongo();
const app = express();
const port = 5000;

//This line configures Express to recognize incoming request objects as JSON objects.
//express.json() is built-in middleware provided by the Express framework specifically designed to parse JSON data from incoming requests.
app.use(express.json())
//available routes
//use() is a method in Express used to mount middleware.
//refers to a software layer that sits between the application's incoming requests and outgoing responses.
//functions that intercepts and manipulates the request and response objects.


app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})