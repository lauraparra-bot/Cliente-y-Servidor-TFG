import React, { useState, useEffect } from "react";
import { Loader, Pagination } from "semantic-ui-react";
import { size, map } from "lodash";
import { Tfg } from "../../../../api";
import { TfgItem } from "../TfgItem";
import "./ListTfgs.scss";
import TFGNotification from "../TfgDetail/Notifications/TFGNotication";
import { useTFG } from "../../../../hooks/useTFG";
import { useAuth } from "../../../../hooks";

const tfgController = new Tfg();

export function ListTfgs(props) {
  const { reload, onReload } = props;
  const [tfgs, setTfgs] = useState(false);
  const { misTFGs } = useTFG();
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();
  const {user} = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await tfgController.getTfgs({ page, limit: 8, user: user });
        setTfgs(response.docs);
        setPagination({
          limit: response.limit,
          page: response.page,
          pages: response.pages,
          total: response.total,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page, reload, misTFGs, user]);

  const changePage = (_, data) => {
    setPage(data.activePage);
  };

  if (!tfgs) return <Loader active inline="centered" />;
  if (size(tfgs) === 0) return "No hay ningun TFG";

  return (
    <div className="list-tfgs">
        <TFGNotification/>
      {map(tfgs, (tfg) => (
        <TfgItem key={tfg._id} tfg={tfg} onReload={onReload} />
      ))}

      <div className="list-tfgs__pagination">
        <Pagination
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}
