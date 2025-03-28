import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { updateProfile } from '../controller/user.controller';

const router = express.Router();

router.route('/profile/update').put(isAuthenticated, updateProfile);

export default router;
