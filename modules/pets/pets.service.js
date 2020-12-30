const Queue = require('../queue/Queue')
const store = require('../../store')

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
  }
}
