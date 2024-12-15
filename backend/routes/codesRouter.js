import express from 'express';
import {
  saveCode,
  getCodesByUser,
  getCodeById,
  updateCode,
  deleteCode,
} from '../controllers/codesController.js';

const router = express.Router();

// Route to create a new code entry
router.post('/', saveCode);

// Route to get all codes for a specific user
router.get('/user/:userId', getCodesByUser);

// Route to get a specific code by ID
router.get('/:id', getCodeById);

// Route to update a code
router.put('/:id', updateCode);

// Route to delete a code
router.delete('/:id', deleteCode);

export default router;
