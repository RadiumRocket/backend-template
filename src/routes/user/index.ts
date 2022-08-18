import express from 'express';

import userSchema from 'src/models/user';

import controllers from './controllers';

console.log('userSchema: ', userSchema);

const router = express.Router();

router.get('/', controllers.getAllUsers);
router.get('/:id', controllers.getUserById);
router.post('/', controllers.createUser);
router.patch('/:id', controllers.editUser);
router.put('/:id', controllers.deleteUser);

export default router;
