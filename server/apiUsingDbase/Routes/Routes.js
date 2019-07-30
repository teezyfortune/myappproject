import { Router } from 'express';
import UserController from '../controller/Users';
import ValidateMiddleware from '../middleware';
import meetUpController from '../controller/meetup';
import QuestionController from '../controller/questions';

const router = Router();
router.post('/signup', ValidateMiddleware.validatesignUp, UserController.signUp);
router.post('/login', ValidateMiddleware.validateSignIn, UserController.login);
router.post('/meetup', ValidateMiddleware.validateMeetUp, ValidateMiddleware.VerifyToken, meetUpController.CreateMeetUp);
router.post('/question', ValidateMiddleware.validatQuestion, ValidateMiddleware.VerifyToken, QuestionController.createQuestion);

router.get('/meetup', meetUpController.getAllMeetUp);
export default router;
