import React from 'react';
import { BrowserRouter as Router,Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import Dashboardsup from './pages/DashboardSup';
import Dashboardjefe from './pages/Dashboardjefe';
import Brigadas from './pages/Brigadas';
import Investigaciones from './pages/Investigaciones';
import Login from './pages/login';
import InvestigacionesJefe from './pages/InvestigacionesJefe';
import GestionTareas from './pages/GestionTareas';
import GestionTareasExperto from './pages/GestionTareasExperto';
import GestionNovedades from './pages/GestionNovedades';
import PrivateRoute from './graphql/mutations/auth/privateRoute';

// Configura tu cliente Apollo
const client = new ApolloClient({
  uri: '/graphql', // cambia por la url de tu backend GraphQL
  cache: new InMemoryCache(),
});

const App = () => {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Rutas Admin */}
        <Route element={<PrivateRoute allowedRoles={['Admin']} />}>
          <Route path="/dashboardsup" element={<Dashboardsup />} />
          <Route path="/brigadas" element={<Brigadas />} />
          <Route path="/investigaciones" element={<Investigaciones />} />
        </Route>

        {/* Rutas Jefe de brigada */}
        <Route element={<PrivateRoute allowedRoles={['Jefe de brigada']} />}>
          <Route path="/dashboardjefe" element={<Dashboardjefe />} />
          <Route path="/investigacionesjefe" element={<InvestigacionesJefe />} />
          <Route path="/novedades" element={<GestionNovedades />} />
          <Route path="/tareas/:investigacion" element={<GestionTareas />} />
        </Route>

        {/* Rutas Expertos */}
        <Route element={<PrivateRoute allowedRoles={['Co-investigador', 'Auxiliar técnico', 'Botánico']} />}>
          <Route path="/tareasExperto/:expertoCc" element={<GestionTareasExperto />} />
        </Route>

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
  );
};

export default App;
