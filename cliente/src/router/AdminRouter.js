import React from 'react'
import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "../layouts"
import { Auth, Users, Tfgs, Menu } from "../pages/admin";
import { useAuth } from "../hooks";
import MisTFGs from '../pages/admin/MisTFGs/MisTFGs';
import UserSearch from '../pages/admin/TFGAdmin/UsersSearch';

export function AdminRouter() {
  const { user } = useAuth();

  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      {!user ? (
        <Route path="/" element={<Auth />} />
      ) : (
        <>
          {/* {["/admin", "/admin/blog"].map((path) => (
            <Route
              key={path}
              path={path}
              element={loadLayout(AdminLayout, Blog)}
            />
          ))} */}

          <Route path="/" element={loadLayout(AdminLayout, Tfgs)} />
          <Route path="/admin/users" element={loadLayout(AdminLayout, Users)} />
          <Route path="/admin/tfgs" element={loadLayout(AdminLayout, Tfgs)} />
          <Route path="/admin/menu" element={loadLayout(AdminLayout, Menu)} />
          <Route path='/admin/tustfgs' element={loadLayout(AdminLayout, UserSearch)}/>          
          <Route path="/tfg/mistfgs" element={loadLayout(AdminLayout, MisTFGs)}/>
        </>
      )}
    </Routes>
  );
}
