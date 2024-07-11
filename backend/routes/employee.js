const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

router.post('/entry', async (req, res) => {
  const { id, name, entryTime } = req.body;

  try {
    const existingEmployee = await Employee.findOne({ id, status: 'in' });
    if (existingEmployee) {
      return res.status(400).json({ message: 'El empleado ya está registrado como ingresado.' });
    }

    const employee = new Employee({
      id,
      name,
      entryTime,
      status: 'in'
    });

    await employee.save();
    res.status(201).json({ message: 'Ingreso registrado exitosamente.', employee });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar ingreso.', error });
  }
});

router.post('/exit', async (req, res) => {
  const { id, name, exitTime } = req.body;

  try {
    const existingEmployee = await Employee.findOne({ id, status: 'in' });
    if (!existingEmployee) {
      return res.status(400).json({ message: 'El empleado no está registrado como ingresado.' });
    }

    const employee = new Employee({
      id,
      name,
      entryTime: existingEmployee.entryTime, 
      exitTime,
      status: 'out'
    });

    await employee.save();
    
    
    existingEmployee.status = 'out';
    await existingEmployee.save();

    res.status(200).json({ message: 'Egreso registrado exitosamente.', employee });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar egreso.', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener empleados.', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Empleado no encontrado.' });
    }
    res.status(200).json({ message: 'Empleado eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar empleado.', error });
  }
});

module.exports = router;
