const Queue = require('../queue/Queue')
const store = require('../../store')
const { enqueue } = require('../people/people.service')

// Set up initial data.
// --------------------

const pets = {
  cats: new Queue(),
  dogs: new Queue()
}

store.cats.forEach(cat => pets.cats.enqueue(cat))
store.dogs.forEach(dog => pets.dogs.enqueue(dog))

// --------------------

module.exports = {
  get() {
    // Return the pets next in line to be adopted.
    const nextCat = pets.cats.show()
    const nextDog = pets.dogs.show()
    const upForAdoption = {cat: nextCat, dog: nextDog}
    
    return upForAdoption
  },

  dequeue(type) {
    // Remove a pet from the queue.
    if(type === 'cat'){
      return pets.cats.dequeue()
    }

    if(type === 'dog'){
      return pets.dogs.dequeue()
    }
  },

  enqueue(type){
    if(type === 'cat'){
      store.cats.forEach(cat => pets.cats.enqueue(cat))
    }
    if(type === 'dog'){
      store.dogs.forEach(dog => pets.dogs.enqueue(dog))
    }
  }
}
