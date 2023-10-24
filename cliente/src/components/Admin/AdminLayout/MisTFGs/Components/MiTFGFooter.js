import { Table, Menu } from "semantic-ui-react";
import { useAuth } from "../../../../../hooks";
import TFGUserService from "../../../../../api/tfguser";
import { useTFG } from "../../../../../hooks/useTFG";
import DeleteDialog from "./DeleteDialog";
const MiTFGFooter = () => {
  const { user, accessToken } = useAuth();
  const { closeListTFGs } = TFGUserService();
  const {
    reloadMisTFGs,
    setMessage,
    setAbrir,
    setIsLoadingRequest,
    easignado,
    setError,
  } = useTFG();

  const handleClick = async (e) => {
    try {
      setIsLoadingRequest(true);
      const result = await closeListTFGs(user.email, accessToken);
      setMessage(result.message);
      setAbrir(true);
      await reloadMisTFGs();
      setIsLoadingRequest(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setAbrir(true);
      setIsLoadingRequest(false);
    }
  };

  return (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="6">
          <DeleteDialog
            id={0}
            message={"¿Estás seguro de que quieres cerrar el listado?"}
            cerrarlistado={true}
            buttonMsg={"Cerrar listado"}
            icon={'window close'}
          ></DeleteDialog>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );
};

export default MiTFGFooter;
