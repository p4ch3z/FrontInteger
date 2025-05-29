import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulación: autenticar según usuario y redirigir según rol
    if (credentials.username === 'admin' && credentials.password === '1234') {
      localStorage.setItem('token', 'mock-token');
      navigate('/dashboardsup');
    } else if (credentials.username === 'jefe' && credentials.password === '1234') {
      localStorage.setItem('token', 'mock-token');
      navigate('/dashboardjefe');
    } else if (credentials.password === '1234') {
      // Cualquier otro usuario se considera experto
      localStorage.setItem('token', 'mock-token');
      localStorage.setItem('experto', credentials.username);
      navigate(`/gestion-tareas/${credentials.username}`);
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={credentials.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        {error && <p className="error-text">{error}</p>}

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
