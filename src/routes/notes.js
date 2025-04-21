import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote
} from '../controllers/notesController.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);

router.get('/', getNotes);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router; 