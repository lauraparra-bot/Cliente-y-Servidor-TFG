import { Modal, Button } from "semantic-ui-react";

const TFGCreatedModal = ({ abrirModal, setAbrirModal, mensaje }) => {
  return (
    <Modal
      centered={false}
      open={abrirModal}
      onOpen={() => setAbrirModal(true)}
      onClose={() => setAbrirModal(false)}
      dimmer={'inverted'}
    >
      <Modal.Header>Información</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <h4>{mensaje}</h4>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={() => setAbrirModal(false)}>
          Cerrar
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default TFGCreatedModal;
