import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import LoginPage from './components/authPages/login/loginPage'
import SignupPage from './components/authPages/signup/signupPage'
import MainPage from './components/converter/converter';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='login' element={<LoginPage/>}/>
      <Route path='signup' element={<SignupPage/>}/>
      <Route path='convert' element={<MainPage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
