// src/App.jsx
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DashboardAdmin from './pages/DashboardAdmin';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
