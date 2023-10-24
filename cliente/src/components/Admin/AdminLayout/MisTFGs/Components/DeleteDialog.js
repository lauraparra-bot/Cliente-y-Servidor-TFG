import { Button, Modal, Icon, Header } from "semantic-ui-react";
import { useState } from "react";
import TFGUserService from "../../../../../api/tfguser";
import { useTFG } from "../../../../../hooks/useTFG";
import { useAuth } from "../../../../../hooks";

const DeleteDialog = ({ id, message, cerrarlistado, buttonMsg, icon }) => {
  const [open, setOpen] = useState(false);
  const { deleteTempTFG, closeListTFGs } = TFGUserService();
  const { accessToken, user } = useAuth();
  const {
    reloadMisTFGs,
    setAbrir,
    setMessage,
    setError,
    easignado,
    setIsLoadingRequest,
  } = useTFG();

  const handleClick = async () => {
    try {
      if (cerrarlistado) {
        setIsLoadingRequest(true);
        const result = await closeListTFGs(user.email, accessToken);
        setMessage(result.message);
        setAbrir(true);
        await reloadMisTFGs();
        setIsLoadingRequest(false);
      } else {
        const result = await deleteTempTFG(id, accessToken);
        // Filter misTFGs to delete id
        if (result && result.eliminado) {
          await reloadMisTFGs();
          setMessage("TFG eliminado correctamente");
          setAbrir(true);
        } else {
          setMessage("No se ha podido eliminar el TFG");
          setAbrir(true);
        }
      }
      setOpen(false);
    } catch (error) {
      console.error(error);
      setError("Ha ocurrido un error " + error);
      setAbrir(true);
      setOpen(false);
    }
  };

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={
        <Button
          negative={!cerrarlistado}
          basic={cerrarlistado}
          disabled={easignado}
        >
          {buttonMsg}
        </Button>
      }
    >
      <Header icon>
        <Icon name={icon} />
        {message}
      </Header>
      <Modal.Actions>
        <Button
          onClick={() => {
            handleClick();
          }}
          positive
        >
          Sí
        </Button>
        <Button color="black" onClick={() => setOpen(false)} negative>
          No
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteDialog;
