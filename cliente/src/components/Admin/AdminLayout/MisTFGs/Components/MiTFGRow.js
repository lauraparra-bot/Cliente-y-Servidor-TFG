import { Table } from "semantic-ui-react";
import RenderStateAssigned from "./RenderStateAssigned";
import DeleteDialog from "./DeleteDialog";
import TFGDetail from "../../../Tfg/TfgDetail/TFGDetail";
import { useTFG } from "../../../../../hooks/useTFG";

const MiTFGRow = ({ tfg }) => {
  const { easignado } = useTFG();

  return (
    <Table.Row>
      <Table.Cell>{tfg.Priority}</Table.Cell>
      <Table.Cell>{tfg.titleTFG}</Table.Cell>
      <Table.Cell>{tfg.Points}</Table.Cell>
      <Table.Cell>
        <RenderStateAssigned state={tfg.assigned}></RenderStateAssigned>
      </Table.Cell>
      <Table.Cell textAlign="right">
        <TFGDetail
          tfg={tfg}
          texto={!easignado ? "Actualizar" : "Ver"}
        ></TFGDetail>
        <DeleteDialog
          id={tfg._id}
          message={"¿Estás seguro de que quieres eliminar el TFG?"}
          cerrarlistado={false}
          buttonMsg={"🗑"}
          icon={'trash'}
        ></DeleteDialog>
      </Table.Cell>
    </Table.Row>
  );
};

export default MiTFGRow;
