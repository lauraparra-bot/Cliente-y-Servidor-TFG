import { Button, Image, Modal, Label } from "semantic-ui-react";
import { useState } from "react";
import TFGDetailForm from "./Form/TFGDetailForm";

const TFGDetail = ({ tfg, texto }) => {
  const [open, setOpen] = useState(false);
  const { title, description, tutor, miniature, asignaturas } = tfg;
  const arrAsignaturas = asignaturas.split(",");
  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={<Button>{texto}</Button>}
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content image>
          <Image size="medium" src={`${miniature}`} wrapped />
          <Modal.Description>
            <p>{description}</p>
            <Label as="a" image>
              <img src="https://react.semantic-ui.com/images/avatar/small/joe.jpg" />
              {tutor}
            </Label>
            {arrAsignaturas.length &&
              arrAsignaturas.map((asign) => {
                return (
                  <Label as="a" tag color="red">
                    {asign}
                  </Label>
                );
              })}
            <TFGDetailForm tfg={tfg} setOpen={setOpen} open={open} />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary onClick={() => setOpen(false)}>
            Cerrar
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default TFGDetail;
