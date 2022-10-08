import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import HomePage from './pages/HomePage/HomePage';
import FilePage from './pages/FilePages/FilePage';
import CreateFilePage from './pages/FilePages/CreateFilePage';

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
