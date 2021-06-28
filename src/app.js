const express = require('express')
const userRouter = require('./routes/user')
const artRouter = require('./routes/art')
const port = process.env.PORT || process.env.MY_PORT;

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
var cors = require('cors')

require('./db/db')

const app = express()

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(artRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('Welcome to the Louvre!')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})