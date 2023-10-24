import React, { useState } from 'react'
import { Image, Button, Icon, Confirm } from 'semantic-ui-react';
import { BasicModal } from '../../../Shared';
import { TfgForm } from '../TfgForm';
import TFGDetail from "../TfgDetail/TFGDetail";
import { Tfg, tfg } from "../../../../api";
import { useAuth } from '../../../../hooks';
import { ENV } from '../../../../utils';
import "./TfgItem.scss";

const tfgController = new Tfg();

export function TfgItem(props) {
    const { tfg, onReload } = props;
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const { accessToken } = useAuth();

    const { user: { role }, } = useAuth();
    const isAdmin = role === "admin";

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm(prevState => !prevState);

    const openUpdateTfg = () => {
        setTitleModal(`Actualizar ${tfg.title}`);
        onOpenCloseModal();
    };

    const onDelete = async () => {
        try {
            await tfgController.deleteTfg(accessToken, tfg._id);
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className='tfg-item'>
                <div className='tfg-item__info'>
                    <Image src={`${tfg.miniature}`} />
                    <div>
                        <p>{tfg.title}</p>
                    </div>
                </div>
                {isAdmin && (
                    <div>
                        {/* <Button color='grey' icon as="a" href={tfg.url} target="_blank">
                            <Icon name='eye' />
                        </Button> */}
                        <Button color='teal' icon onClick={openUpdateTfg} >
                            <Icon name='pencil' />
                        </Button>
                        <Button icon color='red' onClick={onOpenCloseConfirm}>
                            <Icon name='trash' />
                        </Button>
                    </div>
                )}
                {!isAdmin && (
                    <div>
                        {/* <Button color='grey' icon as="a" href={tfg.url} target="_blank">
                            <Icon name='eye' />
                        </Button> */}
                        {/* <Button color='teal' icon onClick={openUpdateTfg} >
                            <Icon name='pencil' />
                        </Button>
                        <Button icon color='red' onClick={onOpenCloseConfirm}>
                            <Icon name='trash' />
                        </Button> */}
                        <TFGDetail tfg={tfg} texto={"Detalle"} />
                    </div>
                )}
            </div>

            <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
                <TfgForm onClose={onOpenCloseModal} onReload={onReload} tfg={tfg} />
            </BasicModal>

            <Confirm
                open={showConfirm}
                onCancel={onOpenCloseConfirm}
                onConfirm={onDelete}
                content={`¿Eliminar el TFG ${tfg.title}?`}
                size='mini'
            />
        </>
    );
}
