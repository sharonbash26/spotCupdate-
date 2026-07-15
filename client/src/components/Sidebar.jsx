import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

export function Sidebar({ open, onClose }) {
  const { user, signOut } = useAuth();

  return (
    <>
      {open && <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />}
      <nav className={`sidebar ${open ? "sidebar--open" : ""}`} aria-label="Main navigation">
        <div className="sidebar__logo">Spotify Clone</div>
        <ul className="sidebar__list">
          <li>
            <NavLink to="/" end className="sidebar__link" onClick={onClose}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites" className="sidebar__link" onClick={onClose}>
              Favorites
            </NavLink>
          </li>
        </ul>

        <div className="sidebar__auth">
          {user ? (
            <>
              <div className="sidebar__user">{user.email}</div>
              <button type="button" className="sidebar__link sidebar__logout" onClick={signOut}>
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="sidebar__link" onClick={onClose}>
                Log in
              </NavLink>
              <NavLink to="/register" className="sidebar__link" onClick={onClose}>
                Sign up
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
