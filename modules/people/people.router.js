const express = require('express')
const json = require('body-parser').json()
const xss = require('xss')

const People = require('./people.service')

const router = express.Router()

const serializePerson = person => ({
  name: xss(person.name),
  user: person.user
})

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

  const updatedQueue = People.enqueue(serializePerson(newPerson))
  res
    .status(201)
    .json(updatedQueue)
})

module.exports = router
