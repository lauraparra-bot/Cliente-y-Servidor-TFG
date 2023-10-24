import { Image, Button, Icon } from "semantic-ui-react";
import "../../Tfg/TfgItem/TfgItem.scss";
import { BasicModal } from "../../../Shared";
import { useState } from "react";
import TFGDetail from "../../Tfg/TfgDetail/TFGDetail";

const MiTFGItem = () => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const openUpdateTfg = () => {
    setTitleModal(`Actualizar este tfg`);
    onOpenCloseModal();
  };

  const tfg = {
    description: "Entrenamiento de redes neuronales para la resolución de problemas deregresión de nubes de puntos en entornos industriales",
    tutor: "Rubius OMG",
    miniature: "tfg/Ox0fi50yJVu6i5AeTsBLG4bZ.jpg",
    title:
      "Entrenamiento de redes neuronales para la resolución de problemas deregresión de nubes de puntos en entornos industriales",
    assignedMailUser: "aria@gmail.com",
    active: true,
    assigned: "pendiente",
    Points: 8,
    Priority: "4",
  };
  return (
    <>
      <div className="tfg-item">
        <div className="tfg-item__info">
          <Image src="https://depor.com/resizer/e8X2q6gTY20zv0xrKpbPb11b3Cs=/1200x675/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/DAYT2F5NUNB7VPAFKUPHNDXVQA.jpg" />
          <div>
            <p>hola hola</p>
          </div>
        </div>
        <div>
          <TFGDetail tfg={tfg} texto={"Ver"}></TFGDetail>
        </div>
      </div>
    </>
  );
};

export default MiTFGItem;
