import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import LoginPage from './components/authPages/login/loginPage'
import SignupPage from './components/authPages/signup/signupPage'
import MainPage from './components/converter/converter';
import RootPage from './components/root/root';
import NotFound from './components/404/404';
import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import DiaryPage from './components/diary/diary';

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: 'ru',
  debug: true,
  detection: {
    order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain']
  },
  interpolation: {
    escapeValue: false
  }
})

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='' element={<RootPage />} />
      <Route path='login' element={<LoginPage/>}/>
      <Route path='signup' element={<SignupPage/>}/>
      <Route path='convert' element={<MainPage/>}/>
      <Route path='diary' element={<DiaryPage/>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
