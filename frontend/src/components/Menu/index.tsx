import { NavLink } from "react-router-dom";

const Menu = () => {
  const links = [
    // For some reason 'to': '/' is always true
    { to: "/home", text: "Home" },
    { to: "/main", text: "Main" },
    { to: "/asdf", text: "ASDf" },
    { to: "/asdf", text: "ASDf" },
  ];
  return (
    <div className="flex flex-wrap gap-10 justify-center font-bold text-4xl">
      <div>
        {links.map((link) => {
          return (
            <NavLink to={link.to} className="px-16 align-text-bottom">
              {({ isActive }) => (
                <span
                  className={
                    isActive
                      ? "text-primary hover:text-primary-variant"
                      : "text-white hover:text-primary"
                  }
                >
                  {link.text}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
