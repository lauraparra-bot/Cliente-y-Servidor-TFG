import React from 'react'
import { Menu, Icon } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from "../../../../hooks";
import "./AdminMenu.scss";

export function AdminMenu() {
    const { pathname } = useLocation();
    const { user: { role }, } = useAuth();
    const isAdmin = role === "admin";

    const isCurrentPath = (path) => {
        if (path === pathname) return true;
        return false;
    };
    return (
        <Menu fluid vertical icon text className='admin-menu'>
            {isAdmin && (
                <>

                    <Menu.Item as={Link} to="/admin/users" active={isCurrentPath("/admin/users")}>
                        <Icon name='users' />
                        Alumnos
                    </Menu.Item>


                    <Menu.Item as={Link} to="/admin/tfgs" active={isCurrentPath("/admin/tfgs")}>
                        <Icon name='list' />
                        Lista de TFG
                    </Menu.Item>

                    <Menu.Item as={Link} to="/admin/tustfgs" active={isCurrentPath("/admin/tustfgs")}>
                        <Icon name='search' />
                        Buscador TFG Alum
                    </Menu.Item>

                    {/* 
                    <Menu.Item as={Link} to="/admin/menu" active={isCurrentPath("/admin/menu")}>
                        <Icon name='bars' />
                        Menu
                    </Menu.Item> */}

                    {/* <Menu.Item as={Link} to="/admin/blog" active={isCurrentPath("/admin/blog")}>
                        <Icon name='comment alternate outline' />
                        Recursos e Info
                    </Menu.Item> */}
                </>
            )}
            {/* Este es el codigo de un usuario NO ADMIN */}
            {!isAdmin && (
                <>
                    <Menu.Item as={Link} to="/admin/users" active={isCurrentPath("/admin/users")}>
                        <Icon name='user' />
                        Mi Perfil
                    </Menu.Item>

                    <Menu.Item as={Link} to="/admin/tfgs" active={isCurrentPath("/admin/tfgs")}>
                        <Icon name='list' />
                        Lista de TFG
                    </Menu.Item>
                    <Menu.Item as={Link} to="/tfg/mistfgs" active={isCurrentPath("/tfg/mistfgs")}>
                        <Icon name='window restore' />
                        Mis TFG
                    </Menu.Item>
                </>
            )}
        </Menu>



    );
}
