import { useState } from "react";
import { TextField } from "@aws-amplify/ui-react";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { generateClient } from "aws-amplify/api";
import { updateTodo } from "../graphql/mutations";

export default function EditToDo({
  id,
  name,
  description,
  isCompleted,
  isFavorites,
  editOnClick,
}) {
  const [text, setText] = useState(name);
  const client = generateClient();

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleOnMouseLeave = () => {
    try {
        client.graphql(
          graphqlOperation(updateTodo, {
            input: {
              id: id,
              name: text,
              description: description,
              isCompleted: isCompleted,
              isFavorites: isFavorites,
            },
          })
        );
      } catch (err) {
        console.log(err);
      }finally{
          editOnClick("-1");
      }
  };

  return (
    <TextField
      label="Edit To Do"
      labelHidden={true}
      value={text}
      height="6vh"
      width="100%"
      borderRadius="6px"
      backgroundColor="rgba(255,255,255,0.4)"
      className="custom-textfield-class"
      onChange={handleOnChange}
      onMouseLeave={handleOnMouseLeave}
    />
  );
}
