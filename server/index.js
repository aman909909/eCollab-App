const express = require('express')
const app = express()
const cors = require('cors')
const Router = express.Router();
const dbConnection = require('./db')
const router = require('./router');
const port = 8000

app.use(cors());

dbConnection();

app.use('/api', router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})