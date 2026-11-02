import { Link, NavLink } from "react-router-dom";
import { profile } from "../src/data/portfolio.js";

const navigation = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Me" },
  { to: "/project", label: "Projects" },
  { to: "/education", label: "Education" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact Me" },
];

export default function Layout() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <Link to="/" className="brand" aria-label="Jihyun Kim — Home">
          {/* Original initials mark: no third-party company logo is used. */}
          <span className="brand-mark" aria-hidden="true">{profile.initials}</span>
          <span className="brand-name">{profile.name}<small>SOFTWARE &amp; DATA</small></span>
        </Link>
        <nav aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"}
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
    </>
  );
}
