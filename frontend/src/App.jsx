import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ClientDashboard from './pages/ClientDashboard';
import AgentDashboard from './pages/AgentDashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar page={page} setPage={setPage} />
      {page === 'home'   && <Home setPage={setPage} />}
      {page === 'client' && <ClientDashboard setPage={setPage} />}
      {page === 'agent'  && <AgentDashboard setPage={setPage} />}
      {page === 'admin'  && <AdminDashboard setPage={setPage} />}
    </div>
  );
}
