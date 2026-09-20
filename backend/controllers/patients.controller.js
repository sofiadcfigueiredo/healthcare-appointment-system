const db = require('../db');

const getPatients = (req, res) => {
  const sql = 'SELECT * FROM patients';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching patients:', err.message);

      return res.status(500).json({
        message: 'Database error'
      });
    }

    res.json(results);
  });
};

const getPatientById = (req, res) => {
  const id = Number(req.params.id);

  const sql = 'SELECT * FROM patients WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching patient:', err.message);

      return res.status(500).json({
        message: 'Database error'
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: 'Patient not found'
      });
    }

    res.json(results[0]);
  });
};

const createPatient = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: 'Name and email are required'
    });
  }

  const sql = 'INSERT INTO patients (name, email) VALUES (?, ?)';

  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.error('Error creating patient:', err.message);

      return res.status(500).json({
        message: 'Database error'
      });
    }

    const newPatient = {
      id: result.insertId,
      name: name,
      email: email
    };

    res.status(201).json(newPatient);
  });
};

const updatePatient = (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: 'Name and email are required'
    });
  }

  const sql = 'UPDATE patients SET name = ?, email = ? WHERE id = ?';

  db.query(sql, [name, email, id], (err, result) => {
    if (err) {
      console.error('Error updating patient:', err.message);

      return res.status(500).json({
        message: 'Database error'
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Patient not found'
      });
    }

    res.json({
      id: id,
      name: name,
      email: email
    });
  });
};

const deletePatient = (req, res) => {
  const id = Number(req.params.id);

  const sql = 'DELETE FROM patients WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting patient:', err.message);

      return res.status(500).json({
        message: 'Database error'
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Patient not found'
      });
    }

    res.json({
      message: 'Patient deleted successfully',
      id: id
    });
  });
};

module.exports = {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient
};

