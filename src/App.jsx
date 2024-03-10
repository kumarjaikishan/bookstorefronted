import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './pages/Home/home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import Login from './pages/login/login';
import Bookstore from './pages/bookstore/bookstore';
import Author from './pages/author/author';
import Logout from './pages/login/logout';
import Bookdetail from './pages/bookdetail/bookdetail';
import Payment from './pages/payment/payment';
import Admin from './pages/admin/admin';

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
            <Route path="/book"  >
              <Route index element={<Bookstore />} />
              <Route path=":bookid" element={<Bookdetail />} />
            </Route>
            <Route path="/payment/:bookid" element={<Payment />} />
            <Route path="/author" element={<Author />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
