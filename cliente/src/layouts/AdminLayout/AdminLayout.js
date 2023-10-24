import React from 'react'
import { AdminMenu, Logout } from '../../components/Admin/AdminLayout';
import "./AdminLayout.scss";
import { useAuth } from "../../hooks";

export function AdminLayout(props) {
  const { children } = props;
  const { user: { role }, } = useAuth();
  const isAdmin = role === "admin";

  return (
    <div className='admin-layout'>
      <div className='admin-layout__left'>
        {isAdmin ? (
          <h2 className="texto">Panel Admin.</h2>
        ) : (
          <h2 className="texto pageTitle">Solicitud de TFG</h2>
        )}
        <AdminMenu />
      </div>
      <div className='admin-layout__right'>
        <div className='admin-layout__right-header'>
          <Logout />
        </div>
        <div className='admin-layout__right-content'>{children}</div>
      </div>
    </div>

  );
}
