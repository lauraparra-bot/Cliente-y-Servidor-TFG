import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks";
import { useTFG } from "../../../../hooks/useTFG";

export function Logout() {
  const { logout } = useAuth();
  const { logoutTFG } = useTFG();
  const navigate = useNavigate();

  const onLogout = () => {
    logoutTFG();
    logout();
    navigate("/");
  };

  return (
    <Button icon basic inverted onClick={onLogout}>
      <Icon name="power off" /> Cerrar sesión
    </Button>
  );
}
