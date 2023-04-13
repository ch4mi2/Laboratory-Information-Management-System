import { FaUserCircle } from 'react-icons/fa';

const HeaderComponent = ({ logoImgSrc, username }) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{ zIndex: 25555 , justifyContent:'space-between'}}
    >
      <a className="navbar-brand" href="#">
        <img style={{ width: '150px', marginLeft: '2rem' }} src={logoImgSrc} />
      </a>

      <div 
        className="" id="navbarText"
        style={{ display:'flex',marginRight:'2rem', gap:'1rem'}}
      >
        <div className="navbar-text dropdown">
          <a className="dropdown-toggle d-flex align-items-center" href="#" role="button" id="user-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
            <FaUserCircle size={24} />
            
          </a>
          <ul className="dropdown-menu" aria-labelledby="user-dropdown">
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Logout</a></li>
          </ul>
        </div>
        <div>
        <span className="ms-2">{username} temporary@gmail.com </span>
        </div>
        
      </div>
    </nav>
  );
};

export default HeaderComponent;
