import express from 'express';
import {
  forgotPassword,
  logout,
  resetPassword,
  signin,
  signup,
  verifyEmail,
} from '../controller/auth.controller';

const router = express.Router();

router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/verifyemail').post(verifyEmail);
router.route('/passwordrecovery').post(forgotPassword);
router.route('/resetpassword/:code').post(resetPassword);
router.route('/ogout').post(logout);
