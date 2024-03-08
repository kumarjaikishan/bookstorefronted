import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './pages/Home/home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import Login from './pages/login/login';

function App() {
  const dispatch = useDispatch();
 

  return (
    <>
      <ToastContainer closeOnClick={true} pauseOnFocusLoss={true} />
      <div className="App" >
        <Navbar />
        <div className='main' >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
