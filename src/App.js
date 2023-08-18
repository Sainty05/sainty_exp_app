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
import MyProfile from './component/MyProfile';
import AddExpences from './component/DailyExpences/AddExpences';
import PieChart from './component/DailyExpences/PieChart';
import MonthlyData from './component/DailyExpences/MonthlyData';
import NoRoutesFound from './component/NoRoutesFound';
import ManageExpences from './component/DailyExpences/ManageExpences';



function App() {
  const { toast, userId } = useGlobalContext()
  return (
    <div className='bg-gradient-to-r from-black to-gray-600 text-white pb-1 min-vh-100'>
      <Toast ref={toast} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/manageExpences" element={<ManageExpences />} />
        <Route path="/addExpences" element={<AddExpences />} />
        <Route path="/pieChart" element={<PieChart />} />
        <Route path="/monthlyData" element={<MonthlyData />} />
        {userId === 1 && <Route path="/users" element={<Users />} />}
        <Route path='*' element={<NoRoutesFound />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
