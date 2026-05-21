import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <div className="sidebar">
        <Sidebar />
      </div>

      <div className="main-content">
        {children}
      </div>
    </div>
  );
}