import React, { useEffect } from 'react'
import './navbar.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../assets/book.webp'

const Navbar = () => {
  const dispatch = useDispatch();
  const log = useSelector((state) => state.login);
  useEffect(() => {
    //  console.log(log);
  }, [])

  

  return (
    <>
      <div className='nav'>
        <header>
          <div className="logo">
            <NavLink className="navlink" to='/' >
              <img src={logo} alt="" /> <h2>BookStore</h2>
            </NavLink>
          </div>
          <nav>
            <ul>
              <NavLink className="navlink" to='/'><li>Dashboard</li></NavLink>
              <NavLink className="navlink" to='/book'><li>Book Store</li></NavLink>
              <NavLink className="navlink" to='/author'><li>Aurthor</li></NavLink>
              {log.islogin && log.isadmin && <NavLink className="navlink" to='/admin'><li>Admin</li></NavLink>}
              <NavLink className="navlink" to='/logout'><li>Logout</li></NavLink>
            </ul>
          </nav>
        </header>
      </div>
    </>
  )
}

export default Navbar;