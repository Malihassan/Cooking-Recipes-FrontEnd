import { Link } from "react-router-dom";
import classes from './navbar.module.css'
const Navbar = () => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-dark col-12  ${classes.navbar}`}>
      <div className="container-fluid mx-5">
        <Link className={`navbar-brand fs-1 ${classes.logo}`} to="/">
          Recipes
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mx-4" id="navbarNavDropdown">
          <ul className={`navbar-nav col-5 ${classes['navbar-nav']}`}>
            <li className="nav-item">
              <Link className="nav-link fs-4" aria-current="page" to="/">
                Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-4" to="/addRecipe">
                New Recipe
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
