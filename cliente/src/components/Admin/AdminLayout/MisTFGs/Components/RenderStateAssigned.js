import { Label } from "semantic-ui-react";

const estados = {
  temporal: "asignadotemporal",
  asignado: "asignado",
  pendiente: "pendiente",
  no: "no"
};

const RenderStateAssigned = ({ state }) => {
  if (state === estados.temporal) {
    return <Label color="yellow">Temporal</Label>;
  } else if (state === estados.asignado) {
    return <Label color="green">Asignado</Label>;
  } else if (state === estados.pendiente){
    return <Label color="grey">Pendiente</Label>;
  } else{
    return <Label color="red">No</Label>;
  }
};

export default RenderStateAssigned;
