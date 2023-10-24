import { Image, List, Button } from "semantic-ui-react";
import { ENV } from "../../../utils";
import { image } from "../../../assets";
import { Link } from "react-router-dom";

export default function RenderUsers({ users, fetched }) {
  const hasUsers = users?.length > 0;
  return hasUsers ? (
    <UserResults users={users} />
  ) : fetched ? (
    <NoUsersResults />
  ) : null;
}

function NoUsersResults() {
  return <p>No se encontraron usuarios para esta busqueda</p>;
}

function UserResults({ users }) {
  return (
    <List divided verticalAlign="middle">
      {users.map((user) => {
        return (
          <List.Item key={user._id}>
            <List.Content floated="right">
              <Button as={Link} to={`/tfg/mistfgs?email=${user.email}`}>
                Visualizar
              </Button>
            </List.Content>
            <Image
              avatar
              src={
                user.avatar ? `${user.avatar}` : image.noAvatar
              }
            />
            <List.Content>
              {user.firstname} {user.lastname}
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
}
