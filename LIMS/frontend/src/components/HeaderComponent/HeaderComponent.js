import { FaUserCircle } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import {useLogout} from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext';


const HeaderComponent = ({ logoImgSrc, username }) => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () =>
  {
    logout()
  }



  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{ zIndex: 25555 }}
    >
      <a className="navbar-brand" href="#">
        <img style={{ width: '150px', marginLeft: '1rem' }} src={logoImgSrc} />
      </a>
      {user && (
      <div>
        <span>{user.username}</span>
        <button className="btnDelete" onClick={handleClick}>Log out</button>
      </div>)}

      {!user && (
        <div><Link to ="/Welcome">Login</Link></div>
      )}
      

      <div
        className=""
        id="navbarText"
        style={{ display: 'flex', marginRight: '2rem' }}
      >
        <div className="navbar-text dropdown">
          <a
            className="dropdown-toggle d-flex align-items-center"
            href="#"
            role="button"
            id="user-dropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FaUserCircle size={24} />
          </a>
          <ul className="dropdown-menu" aria-labelledby="user-dropdown">
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Logout
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-1">
          <span className="ms-3 align-middle">
            {username} temporary@gmail.com
          </span>
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;
