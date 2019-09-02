import { Router } from 'express';
import UserController from '../controller/Users';
import ValidateMiddleware from '../middleware';
import AdminController from '../controller/Admin/meetup';
import QuestionController from '../controller/questions';
import ReactionController from '../controller/Reaction';
import commentController from '../controller/comment';
import rsvpController from '../controller/rsvp';
import uploadController from '../controller/Admin/upload';

const router = Router();
// User Routes
router.post('/signup', ValidateMiddleware.validatesignUp, UserController.signUp);
router.post('/login', ValidateMiddleware.validatesignUp, UserController.login);
router.post('/meetup', ValidateMiddleware.validateMeetUp, ValidateMiddleware.VerifyToken, AdminController.CreateMeetUp);
router.post('/meetup/:id/question', ValidateMiddleware.validatQuestion, ValidateMiddleware.VerifyToken, QuestionController.createQuestion);
router.post('/question/:id/likes', ValidateMiddleware.VerifyToken, ReactionController.getLike);
router.post('/question/:id/unlike', ValidateMiddleware.VerifyToken, ReactionController.getUnLike);
router.post('/question/:id/comment', ValidateMiddleware.validateComment, ValidateMiddleware.VerifyToken, commentController.comment);
router.post('/meetup/:id/rsvp', ValidateMiddleware.validateRSVP, ValidateMiddleware.VerifyToken, rsvpController.rsvp);

router.post('/meetup/:id/images', ValidateMiddleware.VerifyToken, uploadController.uploadImage);


router.put('/UpdateProfile', ValidateMiddleware.validateprofile, ValidateMiddleware.VerifyToken, UserController.updateProfile);
router.get('/login/profile', ValidateMiddleware.VerifyToken, UserController.userProfile);

//  Admin handle
router.put('/meetup/:id', AdminController.UpdateMeetup);
router.delete('/meetup/:id', ValidateMiddleware.VerifyToken, AdminController.DeleteMeetup);
router.get('/meetup', ValidateMiddleware.VerifyToken, AdminController.getAllMeetUp);
router.get('/meetup/:id', AdminController.getOneMeetUp);

export default router;
