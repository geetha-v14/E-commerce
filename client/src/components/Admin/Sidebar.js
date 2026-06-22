import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
    },
    {
      name: "Products",
      path: "/admin/products",
    },
    {
      name: "Categories",
      path: "/admin/categories",
    },
    {
      name: "Orders",
      path: "/admin/orders",
    },
    {
      name: "Users",
      path: "/admin/users",
    },
  ];

  return (
    <div className="admin-sidebar">

      <h4 className="mb-4">
        MegaMart Admin
      </h4>

      <ul className="list-unstyled">

        {menuItems.map((item) => (
          <li key={item.path} className="mb-2">

            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${
                  isActive
                    ? "fw-bold text-primary"
                    : ""
                }`
              }
            >
              {item.name}
            </NavLink>

          </li>
        ))}

      </ul>
    </div>
  );
};

export default Sidebar;