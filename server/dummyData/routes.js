import { Router } from 'express';
import Users from './database';
import UserController from './users';
import meetUpController  from './meetup';
import questionController from './question';
import upVotesController from './upvotes';
import  DownVoteController  from './downVotes';
import  upComingController from './upcoming';
import RsvpController  from './rsvp';
import valiDate  from '../apiUsingDbase/middleware';

const router = Router();


// gets all users
router.get('/', (req, res)=> res.send(Users));
//get all Questions
router.get('/question', questionController.getAllQuestion);
//get all meetup
router.get('/meetup', meetUpController.getAllmeetup);

// get upcomming meetup
router.get('/upcoming', upComingController.upComingEvent);
//get a single user
router.get('/:id', UserController.getOneById);
// gets a single meetup
router.get('/meetup/:id', meetUpController.getOneMeetup);

// create a user
router.post('/', UserController.createUser);
//create rsvp
router.post('/meetup/:id/rsvp', RsvpController.getRsvp);
//creates a meetup
router.post('/meetup',  valiDate.VerifyToken, meetUpController.creaTmeetUp);
// create a question
router.post('/question', questionController.createQuestion);

//update a user
router.put('/:id', UserController.UpdateUser);
router.put('/question/:id/upvotes',  upVotesController.createUpvote);
router.put('/question/:id/downVotes', DownVoteController.createDownVote);
router.delete('/:id', UserController.deleteUser);

export default router;