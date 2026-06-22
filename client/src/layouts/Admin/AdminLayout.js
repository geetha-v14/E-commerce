import { Outlet } from "react-router-dom";

import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";

import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">

      <aside className="sidebar">
        <Sidebar />
      </aside>

      <div className="main-content">

        <Header />

        <div className="content-area">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default AdminLayout;