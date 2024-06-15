import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DashboardAdmin from './pages/DashboardAdmin';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterPage from './pages/RegisterPage';
import PatientPage from './pages/PatientPage';

function App() {
  return (
    <div className='App'>
      {/* 
        El componente AuthProvider envuelve toda la aplicación para proporcionar
        contexto de autenticación a las rutas protegidas.
      */}
      <AuthProvider>
        {/* 
          El componente Routes define las rutas de la aplicación.
          Cada Route especifica una ruta y el componente que debe renderizarse cuando
          la ruta coincide con la URL actual.
        */}
        <Routes>
          {/* 
            Ruta para la página de inicio.
            Se renderiza el componente Home cuando la ruta coincide exactamente con '/'.
          */}
          <Route
            path='/'
            element={<Home />}
          />
          {/* 
            Ruta para el dashboard administrativo.
            Se utiliza ProtectedRoute para asegurar que solo usuarios autenticados
            puedan acceder a DashboardAdmin.
          */}
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />
          {/* 
            Ruta para la página de registro de usuarios.
            Se renderiza RegisterPage cuando la ruta coincide exactamente con '/register'.
          */}
          <Route
            path='/register'
            element={<RegisterPage />}
          />
          {/* 
            Ruta para la página de información de pacientes.
            Se utiliza ProtectedRoute para asegurar que solo usuarios autenticados
            puedan acceder a PatientPage.
          */}
          <Route
            path='/patient'
            element={
              <ProtectedRoute>
                <PatientPage />
              </ProtectedRoute>
            }
          />
          {/* 
            Ruta por defecto para manejar cualquier otra ruta no especificada.
            Se renderiza Home para cualquier ruta no coincidente.
          */}
          <Route
            path='*'
            element={<Home />}
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;