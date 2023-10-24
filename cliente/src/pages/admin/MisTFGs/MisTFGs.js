import ListMisTfgs from "../../../components/Admin/AdminLayout/MisTFGs/ListMisTFGs";
import { useState } from "react";
import { Tab } from "semantic-ui-react";
import { useLocation } from "react-router-dom";
import "../Tfgs/Tfgs.scss";
import { useAuth } from "../../../hooks";

const MisTFGs = () => {
  const { setMailToSearch } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");

  const [reload, setReload] = useState(false);
  const onReload = () => setReload((prevState) => !prevState);
  
  if (email) setMailToSearch(email);
  const panes = [
    {
      render: () => (
        <Tab.Pane attached={false}>
          <ListMisTfgs reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div className="tfgs-page">
      <div className="tfgs-page__add"></div>
      <Tab menu={{ secondary: true }} panes={panes} />
    </div>
  );
};

export default MisTFGs;
