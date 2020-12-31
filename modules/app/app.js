require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const { NODE_ENV } = require('../../config')
const { validateBearerToken } = require('../middleware/token-auth')
const errorHandler = require('../middleware/error-handler')

const app = express()

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption, {
    skip: () => NODE_ENV === 'test',
}))
app.use(cors())
app.use(helmet())

app.use(validateBearerToken)

app.use('/people', require('../people/people.router'))
app.use('/pets', require('../pets/pets.router'))

app.use(errorHandler)

module.exports = app
