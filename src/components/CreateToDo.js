import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { Flex } from "@aws-amplify/ui-react";
import { Button } from "@aws-amplify/ui-react";
import { TextField } from "@aws-amplify/ui-react";
import { createTodo } from "../graphql/mutations";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { v4 as uuidv4 } from "uuid";
import PlusIcon from "./PlusIcon";
import "@aws-amplify/ui-react/styles.css";

export default function CreateToDo() {
  const [todoName, setTodoName] = useState();

  const handleChange = (event) => {
    setTodoName(event.target.value);
  };
  const addClick = () => {
    const client = generateClient();
    try {
      client.graphql(
        graphqlOperation(createTodo, {
          input: {
            id: uuidv4,
            name: todoName,
            description: todoName,
            isCompleted: false,
            isFavorites: false,
          },
        })
      );
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      as="form"
      ariaLabel="Create Todo"
      style={{ position: "absolute", bottom: "2vh", width: "50vw" }}
    >
      <TextField
        label="Create To Do"
        placeholder="What do you need to do?"
        labelHidden={true}
        backgroundColor="rgba(255,255,255,0.4)"
        borderRadius="6px"
        width="100%"
        margin="4px"
        onChange={handleChange}
        outerEndComponent={
          <Button
            size="small"
            variation="primary"
            colorTheme="info"
            gap="4px"
            onClick={addClick}
          >
            <PlusIcon /> Add
          </Button>
        }
      />
    </Flex>
  );
}
