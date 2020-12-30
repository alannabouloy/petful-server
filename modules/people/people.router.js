const express = require('express')
const json = require('body-parser').json()

const People = require('./people.service')

const router = express.Router()

router.get('/', (req, res) => {
  // Return all the people currently in the queue.
  const people = People.get()
  People.dequeue()
  
  res
    .status(200)
    .json(people)
})

router.post('/', json, (req, res) => {
  // Add a new person to the queue.
  const {name, user = false} = req.body
  if(!name){
    return res
      .status(400)
      .json({error: `Must include 'name' in request body`})
  }

  const newPerson = {name, user: !!user}

  const updatedQueue = People.enqueue(newPerson)
  res
    .status(201)
    .json(updatedQueue)
})

module.exports = router
