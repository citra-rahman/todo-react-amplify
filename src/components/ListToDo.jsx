import { Flex, Text, Button, View, useTheme } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { updateTodo } from "../graphql/mutations";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import CheckIcon from "./icons/CheckIconCircleBlack";
import CheckIconCircleOutlined from "./icons/CheckIconCircleOutlined";
import StarsIconSolid from "./icons/StarsIconSolid";
import DotHorizontal from "./icons/DotHorizontalIcon";

export default function ListToDo({
  id,
  name,
  description,
  isCompleted,
  isFavorites,
}) {
  const { tokens } = useTheme();
  const favoritesOnClick = () => {
    const client = generateClient();
    try {
      client.graphql(
        graphqlOperation(updateTodo, {
          input: {
            id: id,
            name: name,
            description: description,
            isCompleted: isCompleted,
            isFavorites: !isFavorites,
          },
        })
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      as="div"
      ariaLabel="List Todo"
      flexDirection="row"
      justifyContent="space-between"
      backgroundColor={
        isCompleted ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.4)"
      }
      borderRadius="6px"
      height="6vh"
      maxWidth="100%"
      margin="4px"
      padding="10px"
    >
      <Flex justifyContent="start" alignItems="center">
        {isCompleted ? (
          <CheckIcon width={32} height={32} />
        ) : (
          <CheckIconCircleOutlined width={32} height={32} />
        )}
        <Text
          fontSize={tokens.fontSizes.small}
          fontWeight={tokens.fontWeights.bold}
          textDecoration={isCompleted ? "line-through" : "none"}
        >
          {name}
        </Text>
      </Flex>
      <Flex justifyContent="end" alignItems="center" minWidth='calc(1rem + 20vw)'>
        <View>
          <Button size="small" variation="link" onClick={favoritesOnClick}>
            <StarsIconSolid
              width={24}
              height={24}
              color={isFavorites ? "#ddb465" : "none"}
              stroke={isFavorites ? "none" : "grey"}
            />
          </Button>
          <Button size="small" variation="link">
            <DotHorizontal width={32} height={32} />
          </Button>
        </View>
      </Flex>
    </Flex>
  );
}
