import { Table } from "semantic-ui-react";

const MiTFGHeader = () => {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Prioridad</Table.HeaderCell>
        <Table.HeaderCell>Título</Table.HeaderCell>
        <Table.HeaderCell>Tus puntos</Table.HeaderCell>
        <Table.HeaderCell>Estado</Table.HeaderCell>
        <Table.HeaderCell textAlign="right">Acciones</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
};

export default MiTFGHeader;