import Note from '../models/Note.js';

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes', error: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({
      title,
      content,
      user: req.userId
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error creating note', error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findOne({ _id: req.params.id, user: req.userId });
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.title = title;
    note.content = content;
    await note.save();
    
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error updating note', error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note', error: error.message });
  }
}; 