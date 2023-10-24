import { Form, Button, Container } from "semantic-ui-react";
import useUser from "../../../hooks/useUser";
import RenderUsers from "./RenderUsers";
import { useState } from "react";
export default function UserSearch() {
  const { search, setSearch, searchUser, users } = useUser();
  const [fetched, setFetched] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchUser();
    setFetched(true);
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
  };

  return (
    <Container>
      <h1>Busca un usuario</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <input
            placeholder="Fran, Laura, Ana, Joseph..."
            onChange={handleChange}
            name="search"
            value={search}
          />
        </Form.Field>
        <Button type="submit">Buscar</Button>
      </Form>
      <RenderUsers users={users} fetched={fetched}></RenderUsers>
    </Container>
  );
}
