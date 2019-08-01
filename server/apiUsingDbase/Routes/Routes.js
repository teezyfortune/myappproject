import { Router } from 'express';
import UserController from '../controller/Users';
import ValidateMiddleware from '../middleware';
import AdminController from '../controller/Admin/meetup';
import QuestionController from '../controller/questions';

const router = Router();
router.post('/signup', ValidateMiddleware.validatesignUp, UserController.signUp);
router.post('/login', ValidateMiddleware.validateSignIn, UserController.login);
router.post('/meetup', ValidateMiddleware.validateMeetUp, ValidateMiddleware.VerifyToken, AdminController.CreateMeetUp);
router.post('/meetup/:id/question', ValidateMiddleware.validatQuestion, ValidateMiddleware.VerifyToken, QuestionController.createQuestion);

router.get('/meetup', AdminController.getAllMeetUp);
router.get('/meetup/:id', AdminController.getOneMeetUp);

router.put('/meetup/:id', AdminController.UpdateMeetup);

router.delete('/meetup/:id', AdminController.DeleteMeetup);

export default router;
