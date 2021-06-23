const express = require('express')
const userRouter = require('./routes/user')
const port = process.env.PORT

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

require('./db/db')

const app = express()

app.use(express.json())
app.use(userRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})