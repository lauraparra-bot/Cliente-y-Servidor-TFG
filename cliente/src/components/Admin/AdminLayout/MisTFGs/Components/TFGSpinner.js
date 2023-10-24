import { Loader } from "semantic-ui-react";
import { useTFG } from "../../../../../hooks/useTFG";

const TFGSpinner = () => {
  const { isLoadingRequest } = useTFG();

  return (
    <Loader active={isLoadingRequest} size="large" inline="centered">
      Asignando TFGs
    </Loader>
  );
};

export default TFGSpinner;
