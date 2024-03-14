import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { userlogout } from '../../store/api';
import { setlogout } from '../../store/login';

const Logout = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    localStorage.clear("bookstoretoken");
    document.title = "AccuSoft";
    dispatch(userlogout());
    dispatch(setlogout());
    return navigate('/login');
  }, [])
}

export default Logout