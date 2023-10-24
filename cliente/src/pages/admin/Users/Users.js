import React, { useState } from 'react'
import { Tab, Button } from 'semantic-ui-react';
import { BasicModal } from '../../../components/Shared';
import { UserForm, ListUsers, ListMe } from '../../../components/Admin/Users';
import "./Users.scss";
import { useAuth } from "../../../hooks";

export function Users() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  //const onOpenCloseModal = () => {setShowModal(!showModal);}; asi estaba antes
  const onReload = () => setReload((prevState) => !prevState);

  const { user: { role }, } = useAuth();
  const isAdmin = role === "admin";


  const panes = [
    {
      menuItem: "Usuarios activos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers usersActive={true} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Usuarios inactivos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers usersActive={false} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },

  ];

  const panePerfil = [
    {
      menuItem: "Perfil",
      render: () => (
        <Tab.Pane attached={false}>
          <ListMe onReload={onReload} reload={reload} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      {isAdmin && (
        <div className="users-page">
          <Button
            color="purple"
            className="users-page__add"
            floated="right"
            onClick={onOpenCloseModal}
          >
            Nuevo usuario
          </Button>
          <Tab menu={{ secondary: true }} panes={panes} />
        </div>
      )}

      {isAdmin && (
        <BasicModal
          show={showModal}
          close={onOpenCloseModal}
          title="Crear nuevo usuario"
        >
          <UserForm close={onOpenCloseModal} onReload={onReload} />
        </BasicModal>
      )}

      {/* NoAdmin */}

      {!isAdmin && (
        <div className="users-page">
          <Tab menu={{ secondary: true }} panes={panePerfil} />
        </div>
      )}

      {!isAdmin && (
        <BasicModal
          show={showModal}
          close={onOpenCloseModal}
          title="Crear nuevo usuario"
        >
          <UserForm close={onOpenCloseModal} onReload={onReload} />
        </BasicModal>
      )}
    </>
  );

}
