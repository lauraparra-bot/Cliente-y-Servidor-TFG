import { Table } from "semantic-ui-react";
import TFGNotification from "../../Tfg/TfgDetail/Notifications/TFGNotication";
import { useTFG } from "../../../../hooks/useTFG";
import MiTFGRow from "./Components/MiTFGRow";
import MiTFGHeader from "./Components/MITFGHeader";
import MiTFGFooter from "./Components/MiTFGFooter";
import TFGSpinner from "./Components/TFGSpinner";

const MisTFGsTable = () => {
  const { misTFGs, IsLoadingRequest } = useTFG();

  if (IsLoadingRequest) return <TFGSpinner />;
  else {
    return (
      <>
        <TFGNotification />
        <Table unstackable>
          <MiTFGHeader />
          <Table.Body>
            {misTFGs
              .sort((a, b) => a.Priority - b.Priority) // Ordenar por el campo Priority ascendente
              .map((tfg) => {
                return <MiTFGRow key={tfg._id} tfg={tfg} />;
              })}
          </Table.Body>
          <MiTFGFooter />
        </Table>
      </>
    );
  }
};

export default MisTFGsTable;
