import { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
import { listTodos } from "./graphql/queries";
import { generateClient } from "aws-amplify/api";
import { ThemeProvider } from "@aws-amplify/ui-react";
import { Text } from "@aws-amplify/ui-react";
import { Flex } from "@aws-amplify/ui-react";
import CheckIcon from "./components/icons/CheckIconCircleBlack";
import ListToDo from "./components/ListToDo";
import CreateToDo from "./components/CreateToDo";
import EditToDo from "./components/EditToDo";
import "./App.css";

Amplify.configure(awsExports);

export default function App() {
  const [todoList, setToDoList] = useState([]);
  const [editToDo, setEditToDo] = useState("-1");
  const [importantToDoList, setImportantTodoList] = useState([]);

  const theme = {
    name: "pink-light-theme",
    tokens: {
      components: {
        Text: {
          color: { value: "#1f212d" },
        },
        Button: {
          primary: {
            info: {
              backgroundColor: { value: "{colors.black}" },
              color: { value: "{colors.white}" },
            },
          },
        },
      },
    },
  };

  useEffect(() => {
    const client = generateClient();
  }, [todoList, importantToDoList]);

  const handleEditOnClick = (data) => {
    setEditToDo(data);
  };
  return (
    <ThemeProvider theme={theme}>
      <main>
        <Flex
          direction="row"
          justifyContent="center"
          style={{
            padding: "5vh 0",
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
        {importantToDoList.map((item) => {
          return editToDo === item.id ? (
            <EditToDo
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              isFavorites={item.isFavorites}
              isCompleted={item.isCompleted}
              editOnClick={handleEditOnClick}
            />
          ) : (
            <ListToDo
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              isFavorites={item.isFavorites}
              isCompleted={item.isCompleted}
              editOnClick={handleEditOnClick}
            />
          );
        })}
        <br />
        <Text fontSize={24} fontWeight={600}>
          Tasks
        </Text>
        {todoList.map((item) => {
          return editToDo === item.id ? (
            <EditToDo
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              isFavorites={item.isFavorites}
              isCompleted={item.isCompleted}
              editOnClick={handleEditOnClick}
            />
          ) : (
            <ListToDo
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              isFavorites={item.isFavorites}
              isCompleted={item.isCompleted}
              editOnClick={handleEditOnClick}
            />
          );
        })}
        <CreateToDo />
      </main>
    </ThemeProvider>
  );
}
