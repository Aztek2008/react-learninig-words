import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import { MainPage } from 'pages/MainPage/MainPage';
import { AddWordPage, CheckWordPage } from 'pages';

import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
      <main className='App-main'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/add' element={<AddWordPage />} />
            <Route path='/check' element={<CheckWordPage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
