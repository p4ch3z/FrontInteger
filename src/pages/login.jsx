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

  let credentialsAccepted = [
  {
    experto_cc: 1001001026,
    primer_nombre: "Sebastián",
    segundo_nombre: "Mauricio",
    primer_apellido: "Zamora",
    segundo_apellido: "Gallego",
    fecha_nacimiento: "1985-02-01",
    clasificacion: "Co-investigador"
  },
  {
    experto_cc: 1001001025,
    primer_nombre: "Melisa",
    segundo_nombre: "Carolina",
    primer_apellido: "Roldán",
    segundo_apellido: "Velásquez",
    fecha_nacimiento: "1993-05-31",
    clasificacion: "Co-investigador"
  },
  {
    experto_cc: 1001001024,
    primer_nombre: "Tomás",
    segundo_nombre: "Eduardo",
    primer_apellido: "Hernández",
    segundo_apellido: "Salamanca",
    fecha_nacimiento: "1986-09-26",
    clasificacion: "Co-investigador"
  },
  {
    experto_cc: 1001001023,
    primer_nombre: "Sofía",
    segundo_nombre: "Julieta",
    primer_apellido: "Cárdenas",
    segundo_apellido: "Guzmán",
    fecha_nacimiento: "1995-12-15",
    clasificacion: "Co-investigador"
  },
  {
    experto_cc: 1001001022,
    primer_nombre: "Jorge",
    segundo_nombre: "Enrique",
    primer_apellido: "Ramírez",
    segundo_apellido: "Vásquez",
    fecha_nacimiento: "1987-07-18",
    clasificacion: "Co-investigador"
  },
  {
    experto_cc: 1001001021,
    primer_nombre: "Andrea",
    segundo_nombre: "Lucía",
    primer_apellido: "Montoya",
    segundo_apellido: "Londoño",
    fecha_nacimiento: "1988-06-07",
    clasificacion: "Co-investigador"
  },
  {
    experto_cc: 1001001020,
    primer_nombre: "Santiago",
    segundo_nombre: "David",
    primer_apellido: "González",
    segundo_apellido: "Rojas",
    fecha_nacimiento: "1991-11-02",
    clasificacion: "Co-investigador"
  },
  {
    experto_cc: 1001001019,
    primer_nombre: "Natalia",
    segundo_nombre: "Andrea",
    primer_apellido: "Muñoz",
    segundo_apellido: "Córdoba",
    fecha_nacimiento: "1990-03-29",
    clasificacion: "Co-investigador"
  },
  {
    experto_cc: 1001001018,
    primer_nombre: "Juliana",
    segundo_nombre: "María",
    primer_apellido: "Pérez",
    segundo_apellido: "Castaño",
    fecha_nacimiento: "1989-10-11",
    clasificacion: "Auxiliar técnico"
  },
  {
    experto_cc: 1001001017,
    primer_nombre: "Luis",
    segundo_nombre: "Fernando",
    primer_apellido: "Guerrero",
    segundo_apellido: "Ríos",
    fecha_nacimiento: "1992-05-10",
    clasificacion: "Auxiliar técnico"
  },
  {
    experto_cc: 1001001016,
    primer_nombre: "Diana",
    segundo_nombre: "Carolina",
    primer_apellido: "Vega",
    segundo_apellido: "Mendoza",
    fecha_nacimiento: "1994-08-22",
    clasificacion: "Auxiliar técnico"
  },
  {
    experto_cc: 1001001015,
    primer_nombre: "Camilo",
    segundo_nombre: "Andrés",
    primer_apellido: "Ortiz",
    segundo_apellido: "Zapata",
    fecha_nacimiento: "1993-01-19",
    clasificacion: "Auxiliar técnico"
  },
  {
    experto_cc: 1001001014,
    primer_nombre: "Diego",
    segundo_nombre: "Esteban",
    primer_apellido: "Herrera",
    segundo_apellido: "Cano",
    fecha_nacimiento: "1985-09-30",
    clasificacion: "Botánico"
  },
  {
    experto_cc: 1001001013,
    primer_nombre: "Valentina",
    segundo_nombre: "Sofía",
    primer_apellido: "López",
    segundo_apellido: "Ramírez",
    fecha_nacimiento: "1991-07-25",
    clasificacion: "Botánico"
  },
  {
    experto_cc: 1001001012,
    primer_nombre: "Felipe",
    segundo_nombre: "Iván",
    primer_apellido: "Quintero",
    segundo_apellido: "Mejía",
    fecha_nacimiento: "1986-03-03",
    clasificacion: "Botánico"
  },
  {
    experto_cc: 1001001011,
    primer_nombre: "Manuela",
    segundo_nombre: "Isabel",
    primer_apellido: "Restrepo",
    segundo_apellido: "Duque",
    fecha_nacimiento: "1990-11-09",
    clasificacion: "Botánico"
  },
  {
    experto_cc: 1001001010,
    primer_nombre: "Carlos",
    segundo_nombre: "Alberto",
    primer_apellido: "Mora",
    segundo_apellido: "López",
    fecha_nacimiento: "1988-02-17",
    clasificacion: "Jefe de brigada"
  },
  {
    experto_cc: 1001001009,
    primer_nombre: "Paula",
    segundo_nombre: "Andrea",
    primer_apellido: "Salazar",
    segundo_apellido: "Ortiz",
    fecha_nacimiento: "1982-06-13",
    clasificacion: "Jefe de brigada"
  },
  {
    experto_cc: 1001001008,
    primer_nombre: "Andrés",
    segundo_nombre: "Felipe",
    primer_apellido: "Ruiz",
    segundo_apellido: "García",
    fecha_nacimiento: "1975-12-22",
    clasificacion: "Jefe de brigada"
  },
  {
    experto_cc: 1001001007,
    primer_nombre: "Laura",
    segundo_nombre: "Marcela",
    primer_apellido: "Gómez",
    segundo_apellido: "Ríos",
    fecha_nacimiento: "1980-04-05",
    clasificacion: "Jefe de brigada"
  },
  {
    experto_cc: 1001001006,
    primer_nombre: "Daniel",
    segundo_nombre: "Alejandro",
    primer_apellido: "Torres",
    segundo_apellido: "Muñoz",
    fecha_nacimiento: "1987-11-19",
    clasificacion: "Co-investigador"
  },
  {
    experto_cc: 1001001005,
    primer_nombre: "Sara",
    segundo_nombre: "Elena",
    primer_apellido: "Navarro",
    segundo_apellido: "Paredes",
    fecha_nacimiento: "1992-05-05",
    clasificacion: "Botánico"
  },
  {
    experto_cc: 1001001004,
    primer_nombre: "Camilo",
    segundo_nombre: "José",
    primer_apellido: "Luna",
    segundo_apellido: "Cortés",
    fecha_nacimiento: "1988-08-30",
    clasificacion: "Co-investigador"
  },
  {
    experto_cc: 1001001003,
    primer_nombre: "Tatiana",
    segundo_nombre: "Paola",
    primer_apellido: "Mejía",
    segundo_apellido: "Moreno",
    fecha_nacimiento: "1995-03-14",
    clasificacion: "Auxiliar técnico"
  },
  {
    experto_cc: 1001001002,
    primer_nombre: "Esteban",
    segundo_nombre: "Andrés",
    primer_apellido: "Soto",
    segundo_apellido: "Valencia",
    fecha_nacimiento: "1990-12-01",
    clasificacion: "Botánico"
  },
  {
    experto_cc: 1001001001,
    primer_nombre: "Laura",
    segundo_nombre: "Marcela",
    primer_apellido: "Ríos",
    segundo_apellido: "Guzmán",
    fecha_nacimiento: "1984-07-22",
    clasificacion: "Jefe de brigada"
  }
  ];
  const handleSubmit = (e) => {
    e.preventDefault();

    if (credentials.username === 'admin' && credentials.password === '1234') {
      localStorage.setItem('token', 'admin-token');
      localStorage.setItem('experto', 'admin');
      localStorage.setItem('rol', 'Supervisor');
      navigate('/dashboardsup');
      return;
    }

    const user = credentialsAccepted.find(
      (u) => u.experto_cc.toString() === credentials.username
    );

    if (user && credentials.password === user.experto_cc.toString()) {
      localStorage.setItem('token', 'mock-token');
      localStorage.setItem('experto', credentials.username);
      localStorage.setItem('rol', user.clasificacion);

      // Redirigir según clasificación
      switch (user.clasificacion) {
        case 'Jefe de brigada':
          navigate('/dashboardjefe');
          break;
        case 'Co-investigador':
          navigate(`/tareasExperto/${credentials.username}`);
          break;
        case 'Auxiliar técnico':
          navigate(`/tareasExperto/${credentials.username}`);
          break;
        case 'Botánico':
          navigate(`/tareasExperto/${credentials.username}`);
          break;
        default:
          navigate(`/login`);
          break;
      }
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
