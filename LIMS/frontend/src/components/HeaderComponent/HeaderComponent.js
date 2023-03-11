const HeaderComponent = ({ profileImgSrc, logoImgSrc, username }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <img style={{ width: '150px', marginLeft: '1rem' }} src={logoImgSrc} />
      </a>

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
