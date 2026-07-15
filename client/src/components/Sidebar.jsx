import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export function Sidebar({ open, onClose }) {
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
      </nav>
    </>
  );
}
