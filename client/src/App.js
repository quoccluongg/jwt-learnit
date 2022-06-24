import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './components/Login';
import SignUp from './components/Signup';
import Lading from './layout/Lading';
import AuthContextProvider from './context/AuthContext'
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthContextProvider>
    <Routes>
      <Route path='/' element={<Lading />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </AuthContextProvider>
  );
}

export default App;
