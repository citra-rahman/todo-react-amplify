import { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
import { createTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";
import { generateClient } from "aws-amplify/api";
import {
  Authenticator,
  ThemeProvider,
  Button,
  Text,
  Flex,
} from "@aws-amplify/ui-react";
import CheckIcon from "./components/CheckIconCircleBlack";
import List from "./components/list";
import "./App.css";

Amplify.configure(awsExports);

export default function App() {
  const [todoList, setToDoList] = useState([]);
  const [importantToDoList, setImportantTodoList] = useState([]);

  const theme = {
    name: "pink-light-theme",
    tokens: {
      components: {
        Text: {
          color: { value: "#1f212d" },
        },
      },
    },
  };

  useEffect(() => {
    const client = generateClient();
    client
      .graphql({
        query: listTodos,
      })
      .then((result) => {
        const data = result.data.listTodos.items;
        setToDoList(data.filter((x) => !x.isFavorites));
        setImportantTodoList(data.filter((x) => x.isFavorites));
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Flex
          direction="row"
          justifyContent="center"
          style={{
            padding: "5vh",
            height: "20vh",
          }}
        >
          <CheckIcon width={64} height={64} />
          <br />
          <Text fontSize={24} fontWeight={600}>
            Todo App
          </Text>
        </Flex>
        <Text fontSize={24} fontWeight={600}>
          Important
        </Text>
        {importantToDoList.map((item) => (
          <List key={item.id} text={item.name} isFavorites={item.isFavorites}/>
        ))}
        <br />
        <Text fontSize={24} fontWeight={600}>
          Tasks
        </Text>
        {todoList.map((item) => (
          <List key={item.id} text={item.name} isFavorites={item.isFavorites}/>
        ))}
      </main>
    </ThemeProvider>
  );
}
