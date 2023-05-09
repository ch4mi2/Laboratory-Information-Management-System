

// import { Link, Navigate } from 'react-router-dom';
import {useLogout} from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';


const HeaderComponent = ({ logoImgSrc, username }) => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const handleClick = () =>
  {
    logout()
    navigate("/Welcome")
  }

  const profileClick =() =>
  {
    if(user.username === "admin2")
    {
      navigate("/AdminProfile")
    }
    else
    {
      navigate("/StaffProfile")
    }

  }



  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
      style={{ zIndex: 25555 }}
    >
      <a className="navbar-brand" href="#">
        <img style={{ width: '150px', marginLeft: '1rem' }} src={logoImgSrc} />
      </a>
      {user && (
      <div className="userdiv">
        <span style={{marginRight:"10px"}}>{user.username}                                                                                     </span>
        
        <button className="btnDelete"  onClick={profileClick}>Profile</button>
        <button className="btnDelete" onClick={handleClick}>Log out</button>
        
      </div>)}
      <div className="userdiv">

      {!user && (
        <a href='/Welcome'><button className="btnLogin">Login</button></a>
      )}
      </div>
      

      
    </nav>
  );
};

export default HeaderComponent;
