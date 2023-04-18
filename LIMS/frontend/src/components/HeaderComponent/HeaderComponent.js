import { Link } from 'react-router-dom';
import {useLogout} from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext';


const HeaderComponent = ({ profileImgSrc, logoImgSrc, username }) => {
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
      

      <div className="" id="navbarText">
        <span className="navbar-text">
          <img src={profileImgSrc} />
          {username}
        </span>
      </div>
    </nav>
  );
};

export default HeaderComponent;
