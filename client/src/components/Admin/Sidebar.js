import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: "bi-speedometer2",
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: "bi-box-seam",
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: "bi-grid",
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: "bi-bag-check",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "bi-people",
    },
  ];

  return (
    <div className="admin-sidebar">

      <div className="px-3 mb-4">

        <h3 className="fw-bold text-dark mb-1">
          MegaMart
        </h3>

        <small className="text-muted">
          Admin 
        </small>

      </div>

      <ul className="nav flex-column gap-2">

        {menuItems.map((item) => (

          <li key={item.path} >

            <NavLink
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `d-flex align-items-center gap-3 px-3 py-2  text-decoration-none ${isActive
                  ? "bg-dark text-white "
                  : "text-dark"
                }`
              }
            >

              <i className={`bi ${item.icon}`}></i>

              <span>{item.name}</span>

            </NavLink>

          </li>

        ))}

      </ul>
    </div>
  );
};

export default Sidebar;