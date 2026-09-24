const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');

const { getPatients, getPatientById, createPatient, updatePatient, deletePatient } =
  require('../controllers/patients.controller');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getPatients);

router.get('/:id', getPatientById);

router.post('/', createPatient);

router.put('/:id', updatePatient);

router.delete('/:id', deletePatient);

module.exports = router;