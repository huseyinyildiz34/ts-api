import express from 'express';
import pool from './db';

const app = express();
app.use(express.json()); // JSON gövdelerini okumak için middleware

// GET Request: Tüm kullanıcıları al
app.get('/users', async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM users');
    res.json(users.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// POST Request: Yeni bir kullanıcı ekle
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
