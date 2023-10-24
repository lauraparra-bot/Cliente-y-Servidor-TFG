import "../../Tfg/ListTfgs/ListTfgs.scss";
import { Loader } from "semantic-ui-react";
import MisTFGsTable from "./MisTFGsTable";
import { useTFG } from "../../../../hooks/useTFG";

const ListMisTfgs = () => {
  const { misTFGs, isLoaded, easignado } = useTFG([]);

  if (!misTFGs) return <Loader active={!isLoaded} inline="centered" />;
  if (!misTFGs.length || misTFGs.length === 0)
    return (
      <div className="list-tfgs">
        <h1>No tienes ningún TFG seleccionado</h1>
      </div>
    );

  return (
    <div className="list-tfgs">
      {!easignado ? <h1>Listado provisional</h1> : <h1>Listado cerrado</h1>}
      <MisTFGsTable></MisTFGsTable>
    </div>
  );
};

export default ListMisTfgs;
