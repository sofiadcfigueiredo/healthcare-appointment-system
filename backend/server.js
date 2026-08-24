const express = require('express');

const app = express();

app.use(express.json());

const PORT = 3000;

const patients = [
  {
    id: 1,
    name: 'Maria Silva',
    email: 'maria@example.com'
  },
  {
    id: 2,
    name: 'João Costa',
    email: 'joao@example.com'
  }
];

app.get('/', (req, res) => {
  res.json({
    message: 'Healthcare Appointment API is running! 🚀'
  });
});

app.get('/api/patients', (req, res) => {
  res.json(patients);
});

app.get('/api/patients/:id', (req, res) => {
  const id = Number(req.params.id);

  const patient = patients.find(patient => patient.id === id);

  if (!patient) {
    return res.status(404).json({
      message: 'Patient not found'
    });
  }

  res.json(patient);
});

app.post('/api/patients', (req, res) => {
  const { name, email } = req.body;

  const newPatient = {
    id: patients.length + 1,
    name: name,
    email: email
  };

  patients.push(newPatient);

  res.status(201).json(newPatient);
});

app.put('/api/patients/:id', (req, res) => {
  const id = Number(req.params.id);

  const patient = patients.find(patient => patient.id === id);

  if (!patient) {
    return res.status(404).json({
      message: 'Patient not found'
    });
  }

  const { name, email } = req.body;

  patient.name = name;
  patient.email = email;

  res.json(patient);
});

app.delete('/api/patients/:id', (req, res) => {
  const id = Number(req.params.id);

  const patientIndex = patients.findIndex(patient => patient.id === id);

  if (patientIndex === -1) {
    return res.status(404).json({
      message: 'Patient not found'
    });
  }

  const deletedPatient = patients.splice(patientIndex, 1);

  res.json(deletedPatient[0]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});