import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeForm.css';

const EmployeeForm = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');

  const handleEntry = async () => {
    if (!/^\d+$/.test(id)) {
      setMessage('El ID del empleado debe ser un número.');
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setMessage('El nombre del empleado debe contener solo letras.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/employees/entry', {
        id,
        name,
        entryTime: time
      });
      setMessage(response.data.message);

      setEmployees(prevEmployees => [response.data.employee, ...prevEmployees]);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error al registrar ingreso.');
    }
  };

  const handleExit = async () => {
    if (!/^\d+$/.test(id)) {
      setMessage('El ID del empleado debe ser un número.');
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setMessage('El nombre del empleado debe contener solo letras.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/employees/exit', {
        id,
        name,
        exitTime: time
      });
      setMessage(response.data.message);

      setEmployees(prevEmployees => [response.data.employee, ...prevEmployees]);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error al registrar egreso.');
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/employees');

      setEmployees(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/api/employees/${employeeId}`);
      setMessage(response.data.message);
      fetchEmployees();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error al eliminar el registro.');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const calculateTimeElapsed = (entryTime, exitTime) => {
    const entry = new Date(entryTime);
    const exit = new Date(exitTime);
    const diffMs = exit - entry;
    const diffHrs = Math.floor(diffMs / 3600000); 
    const diffMins = Math.round((diffMs % 3600000) / 60000); 
    return `${diffHrs}h${diffMins}m`;
  };

  return (
    <div className="App">
      <img src='LOGO.png' alt='Logo Exactian' />
      <h2>Registrar Ingreso/Egreso</h2>
      <input
        type="text"
        placeholder="ID del empleado (solo números)"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nombre del empleado (solo letras)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="datetime-local"
        placeholder="Hora de ingreso/egreso"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button onClick={handleEntry}>Registrar Ingreso</button>
      <button onClick={handleExit}>Registrar Egreso</button>
      <p>{message}</p>
      <input
        type="text"
        placeholder="Buscar empleado"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <h2>Empleados</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fecha Ingreso</th>
            <th>Fecha Egreso</th>
            <th>Estado</th>
            <th>Tiempo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {employees.filter(employee => 
            employee.id.includes(search) || employee.name.toLowerCase().includes(search.toLowerCase())
          ).map(employee => (
            <tr key={employee._id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.entryTime ? new Date(employee.entryTime).toLocaleString() : 'N/A'}</td>
              <td>{employee.exitTime ? new Date(employee.exitTime).toLocaleString() : 'N/A'}</td>
              <td>{employee.status}</td>
              <td>
                {employee.entryTime && employee.exitTime ? 
                  calculateTimeElapsed(employee.entryTime, employee.exitTime) : 
                  'N/A'}
              </td>
              <td>
                <button onClick={() => handleDelete(employee._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeForm;
