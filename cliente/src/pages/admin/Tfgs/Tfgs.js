import React, { useState } from 'react'
import { Tab, Button } from 'semantic-ui-react'
import { BasicModal } from "../../../components/Shared";
import { ListTfgs, TfgForm } from '../../../components/Admin/Tfg';
import "./Tfgs.scss";
import { useAuth } from "../../../hooks";

export function Tfgs() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  const { user: { role }, } = useAuth();
  const isAdmin = role === "admin";

  const panes = [
    {
      render: () => (
        <Tab.Pane attached={false}>
          <ListTfgs reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
  ];

  return (

    <>
      {isAdmin && (
        <div className='tfgs-page'>
          <div className='tfgs-page__add' >
            <Button color='purple' floated='right' onClick={onOpenCloseModal}>
              Nuevo TFG
            </Button>
          </div>

          <Tab menu={{ secondary: true }} panes={panes} />


        </div>
      )}

      {isAdmin && (
        <BasicModal show={showModal} close={onOpenCloseModal} title="Crear TFG">
          <TfgForm onClose={onOpenCloseModal} onReload={onReload} />
        </BasicModal>
      )}


      {/* NOADMIN */}
      {!isAdmin && (
        <div className='tfgs-page'>
          <div className='tfgs-page__add' >
          </div>

          <Tab menu={{ secondary: true }} panes={panes} />


        </div>
      )}

    </>

  );
}
