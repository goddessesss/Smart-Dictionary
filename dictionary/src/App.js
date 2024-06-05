import Header from './component/header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import MainPage from './pages/MainPage';
import ModuleDetail from './pages/ModuleDetail';
import TestPage from './pages/TestPage';
import CreateModule from './pages/CreateModule';
import AuthPage from './pages/AuthPage';
import './App.css'

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <Routes>
          <Route path='/' element={<MainPage/>} />
          <Route path='detail' element={<ModuleDetail/>} />
          <Route path='test' element={<TestPage/>} />
          <Route path='create' element={<CreateModule/>} />
          <Route path='login' element={<AuthPage/>} />
        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
