import React, { useRef, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import './header.css';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/images/logo.png'
const nav_links = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/about',
    display: 'About'
  },
  {
    path: '/tours',
    display: 'Tours'
  }
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const stickyHeaderFunc = () => {
    if (!headerRef.current) return; // Ensure headerRef is not null
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      headerRef.current.classList.add('sticky_header');
    } else {
      headerRef.current.classList.remove('sticky_header');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', stickyHeaderFunc);
    return () => {
      window.removeEventListener('scroll', stickyHeaderFunc);
    };
  }, []);

  useEffect(() => {
    // Close the menu when the route changes
    if (menuRef.current) {
      menuRef.current.classList.remove('show_menu');
    }
  }, [location]);

  const toggleMenu = () => menuRef.current.classList.toggle('show_menu');

  return (
    <header className='header' ref={headerRef}>
      <Container>
        <Row>
          <div className='nav_wrapper d-flex align-items-center justify-content-between'>
            {/*-----------------------logo---------------------------- */}
            <div className='logo'>
              <img src={logo} alt='Logo' />
            </div>
            {/*-----------------------logo ends---------------------------- */}
            
            {/*-----------------------menu start---------------------------- */}
            <div className='navigation' ref={menuRef}>
              <ul className='menu d-flex align-items-center gap-5'>
                {nav_links.map((items, index) => (
                  <li className='nav_item' key={index}>
                    <NavLink to={items.path} className={({ isActive }) => (isActive ? 'active_link' : '')}>
                      {items.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/*-----------------------menu end---------------------------- */}
            <div className='nav__right d-flex align-items-center gap-4'>
              <div className='nav__btns d-flex align-items-center gap-4'>
                {user ? (
                  <>
                    <h5 className='mb-0'>{user.username}</h5>
                    <Button className='btn btn-dark' onClick={logout}>Logout</Button>
                  </>
                ) : (
                  <>
                    <Button className='btn secondary__btn'>
                      <Link to='/login'>Login</Link>
                    </Button>

                    <Button className='btn primary__btn'>
                      <Link to='/register'>Register</Link>
                    </Button>
                  </>
                )}
              </div>
              <span className='mobile__menu' onClick={toggleMenu}>
                <i className='ri-menu-line'></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
