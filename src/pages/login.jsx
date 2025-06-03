import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { useMutation } from '@apollo/client';

import { authClient } from '../graphql/apolloClient';
import { LOGIN_MUTATION } from '../graphql/mutations/auth/login';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const [login, { loading }] = useMutation(LOGIN_MUTATION, { client: authClient });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const ccInt = parseInt(credentials.username);
    if (isNaN(ccInt)) {
      setError('El campo usuario debe ser un número');
      return;
    }

    try {
      const { data } = await login({
        variables: {
          cc: ccInt,
          password: credentials.password,
        },
      });

      if (data.login.token) {
        localStorage.setItem('token', data.login.token);
        localStorage.setItem('experto', JSON.stringify(data.login.experto));
        localStorage.setItem('rol', data.login.experto.clasificacion);

        // Redirección basada en clasificación
        switch (data.login.experto.clasificacion) {
          case 'Admin':
            navigate('/dashboardsup');
            break;
          case 'Jefe de brigada':
            navigate('/dashboardjefe');
            break;
          case 'Co-investigador':
            navigate(`/tareasExperto/${ccInt}`);
            break;
          case 'Auxiliar técnico':
            navigate(`/tareasExperto/${ccInt}`);
            break;
          case 'Botánico':
            navigate(`/tareasExperto/${ccInt}`);
            break;
          default:
            navigate('/login');
            break;
        }
      } else {
        setError(data.login.message || 'Error en login');
      }
    } catch (err) {
      setError('Error al comunicarse con el servidor');
      console.error(err);
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
