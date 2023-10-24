import { Label } from "semantic-ui-react";

const TutorLabel = ({ nombreTutor }) => {
  return (
    <div>
      <Label as="a" image>
        <img src="https://react.semantic-ui.com/images/avatar/small/joe.jpg" />
        {nombreTutor}
      </Label>
    </div>
  );
};

export default TutorLabel;
