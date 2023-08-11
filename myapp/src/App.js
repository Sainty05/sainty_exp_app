import './App.css';
import Home from './component/Home';
import Navbar from './component/Navbar';
import { Routes, Route } from "react-router-dom";
import Users from './component/Users';
import "primereact/resources/themes/md-dark-deeppurple/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import Login from './component/Login';
import { useGlobalContext } from './utils/context';
import { Toast } from 'primereact/toast';
import Movies from './component/Movies';
import DailyExpences from './component/DailyExpences/DailyExpences';



function App() {
  const { toast } = useGlobalContext()
  return (
    <div className='bg-gradient-to-r from-black to-gray-600 text-white pb-1 min-vh-100'>
      <Toast ref={toast} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/dailyExpences" element={<DailyExpences />} />
      </Routes>
      {/* <Outlet /> */}
    </div>
  );
}

export default App;
