import db from '../config/db.js';

// Create a new code entry
export const saveCode = async (req, res) => {
  const { userId, content, language, title } = req.body;
  if (!userId || !content || !language || !title) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO codes (userId, content, language, title) VALUES (?, ?, ?, ?)',
      [userId, content, language, title]
    );
    res.status(201).json({ message: 'Code created successfully', codeId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create code' });
  }
};

// Get all codes for a user
export const getCodesByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const [codes] = await db.query(
      'SELECT * FROM codes WHERE userId = ? ORDER BY datePublished DESC',
      [userId]
    );
    res.status(200).json(codes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch codes' });
  }
};

// Get a specific code by ID
export const getCodeById = async (req, res) => {
  const { id } = req.params;

  try {
    const [codes] = await db.query('SELECT * FROM codes WHERE id = ?', [id]);
    if (codes.length === 0) {
      return res.status(404).json({ message: 'Code not found' });
    }
    res.status(200).json(codes[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch code' });
  }
};

// Update a code
export const updateCode = async (req, res) => {
  const { id } = req.params;
  const { content, language, title } = req.body;

  if (!content || !language || !title) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [result] = await db.query(
      'UPDATE codes SET content = ?, language = ?, title = ? WHERE id = ?',
      [content, language, title, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Code not found' });
    }
    res.status(200).json({ message: 'Code updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update code' });
  }
};

// Delete a code
export const deleteCode = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM codes WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Code not found' });
    }
    res.status(200).json({ message: 'Code deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete code' });
  }
};
