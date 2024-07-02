import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
import { createTodo } from "./graphql/mutations";
import { generateClient } from "aws-amplify/api";

Amplify.configure(awsExports);

async function storeToDo() {
  try {
    const client = generateClient();
    await client.graphql({
      query: createTodo,
      variables: {
        input: {
          id: '2',
          name: "Fix UI Bugs",
          description: "Fix UI Bug Both on frontend and backend",
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
}

const App = () => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Welcome {user.username}</h1>
          <button onClick={signOut}>Sign Out</button>
          <button onClick={storeToDo}>New To Do</button>
        </main>
      )}
    </Authenticator>
  );
};
export default App;
