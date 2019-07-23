import { Router } from 'express';
import  UserController from '../auth/Users';
import ValidateMiddleware  from '../middleware';
import meetUpController from '../../../server/apiUsingDbase/modules/meetup';
const router = Router();
router.post('/signup', ValidateMiddleware.validatesignUp, UserController.signUp);
router.post('/login', ValidateMiddleware.validateSignIn, ValidateMiddleware.VerifyToken, UserController.login);
router.post('/meetup', ValidateMiddleware.validateMeetUp, meetUpController.CreateMeetUp)

router.get('/meetup', meetUpController.getAllMeetUp);
export default router;