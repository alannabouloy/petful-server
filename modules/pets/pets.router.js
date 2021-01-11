const express = require('express')
const json = require('body-parser').json()

const Pets = require('./pets.service')
const People = require('../people/people.service')

const router = express.Router()

const refillQueue = (req, res, next) => {
  const pets = Pets.get()
  if(!pets.cat){
    Pets.enqueue('cat')
  }
  if(!pets.dog){
    Pets.enqueue('dog')
  }

  next()
}

router.get('/', refillQueue, (req, res) => {
  // Return all pets currently up for adoption.
  const pets = Pets.get()
  res
    .status(200)
    .json(pets)
})

router.delete('/', json, refillQueue,(req, res) => {
  // Remove a pet from adoption.
  const {type} = req.body
  if(!type){
    return res
      .status(400)
      .json({error: `Must include a 'type' in request body`})
  }

  if(type !== 'dog' && type !== 'cat'){
    return res
      .status(400)
      .json({error: `'type' must be either 'cat' or 'dog'`})
  }
  

  const adopted = Pets.dequeue(type)

  res
    .status(201)
    .json(adopted)
})

module.exports = router
