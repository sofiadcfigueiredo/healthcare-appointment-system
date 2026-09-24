const express = require('express');
const db = require('./db');
const patientsRoutes = require('./routes/patients.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(express.json());

app.use('/api/patients', patientsRoutes);
app.use('/api/auth', authRoutes);

const PORT = 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Healthcare Appointment API is running! 🚀'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});