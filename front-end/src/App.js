import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import HomePage from './components/HomePage/HomePage';
import FilePage from './components/FilePage/FilePage';
import CreateFilePage from './components/FilePage/CreateFilePage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignIn />}  />
      <Route path='/home' element={<HomePage />} />
      <Route path='/file/:id' element={<FilePage />} />
      <Route path='/new-file' element={<CreateFilePage />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/search' element={<HomePage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
