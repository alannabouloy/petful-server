# Petful Server

This is the server for the Petful application. The server is not connected to a database, so it will reset periodically. 

There are two endpoints for this API: 
    1. `/api/people`
    2. `/api/pets`

For `/api/people` you are able to perform two request calls: GET and POST. 

GET will return a list of the people currently in queue in object format with key value pairs: 'name' and 'user'. Name should be a string and user should be a boolean value. GET calls will dequeue the person at the top of the queue immediately following the return of the list.

POST requests require a 'name' value in order to be accepted, but can also take a 'user' value. The 'name' value is expected to be a string and the 'user' value is expected to be a boolean and defaults to false if not provided. Upon a POST request the new person will be enqueued and the current queue will be returned with the new person added to the bottom of the list. 

For `api/pets` there are two possible request calls: GET and DELETE. 

GET will return an object which includes a 'cat' object and a 'dog' object. Both objects will be the pet at the top of their respective queue. Each pet should key-value pairs for the following: `age, breed, description, gender, imageURL, name, and story` with 'imageURL' being a link to an image of the animal. 

DELETE requests require a specified type in the body of the request, either `dog` or `cat`. Depending on the specified type, the animal at the top of the respective queue will be dequeued and returned as an object to the client. 

All requests require a Bearer Token with an authorized API_KEY in order to function. Any unauthorized requests will be returned with a 401 status code and the message: 'Unauthorized request'