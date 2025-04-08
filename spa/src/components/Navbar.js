import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className={({ isActive }) => 
          isActive ? 'nav-link active' : 'nav-link'
        }>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => 
          isActive ? 'nav-link active' : 'nav-link'
        }>
          About
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => 
          isActive ? 'nav-link active' : 'nav-link'
        }>
          Cart
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
