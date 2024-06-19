import Header from './component/header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import MainPage from './pages/MainPage';
import ModuleDetail from './pages/ModuleDetail';
import TestPage from './pages/TestPage';
import CreateModule from './pages/CreateModule';
import AuthPage from './pages/AuthPage';
import './App.css'
import Words from './pages/Words';
import ModulePage from './pages/ModulePage';

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <Routes>
          <Route path='/' element={<MainPage/>} />
          <Route path='module' element={<ModulePage/>} />
          <Route path='detail' element={<ModuleDetail/>} />
          <Route path='/module/:moduleId/test' element={<TestPage/>} />
          <Route path='create' element={<CreateModule/>} />
          <Route path='login' element={<AuthPage/>} />
          <Route path="/module/:moduleId" element={<ModuleDetail/>}  />
          <Route path='word' element={<Words/>} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
