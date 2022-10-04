import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import HomePage from './components/HomePage/HomePage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignIn />}  />
      <Route path='/home' element={<HomePage />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
