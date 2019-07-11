const  express = require('express');
const router = express.Router();
const  Users = require('./database');
const controller = require('./users');
const meetUpController = require('./meetup');
const questionController = require('./question');
const upVotesController = require('./upvotes');
const doWnController = require('./downVotes');
const upComingController = require('./upcoming');
const rsvpController = require('./rsvp');


 // gets all users
router.get('/', (req, res)=> res.send(Users))
//get all Questions
router.get('/question',questionController.getAllQuestion)
//get all meetup
router.get('/meetup',meetUpController.getAllmeetup)
// get upcomming meetup
router.get('/upcoming', upComingController.upComingEvent)

//get a single user
router.get('/:id', controller.getOneById)
// gets a single meetup
router.get('/meetup/:id',meetUpController.getOneMeetup)

// create a user
router.post('/', controller.createUser)
//create rsvp
router.post('/meetup/:id/rsvp', rsvpController.getRsvp)

//creates a meetuprouter.post('/meetup', meetUpController.creaTmeetUp)
// create a question
router.post('/question', questionController.createQuestion)

//update a user
router.put('/:id', controller.UpdateUser)
router.put('/question/:id/upvotes', upVotesController.createUpvote)
router.put('/question/:id/downVotes', doWnController.createDownVote)
router.delete('/:id', controller.deleteUser)

module.exports = router;