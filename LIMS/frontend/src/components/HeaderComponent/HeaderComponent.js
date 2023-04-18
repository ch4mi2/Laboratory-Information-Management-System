

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
      <div className="userdiv">
        <span>{user.username}                                                                                       </span>
        <button className="btnDelete" onClick={handleClick}>Log out</button>
      </div>)}

      {!user && (
        <div className="userdiv"><Link to ="/Welcome">Login</Link></div>
      )}
      

      
    </nav>
  );
};

export default HeaderComponent;
