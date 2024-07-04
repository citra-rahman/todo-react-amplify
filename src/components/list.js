import { Flex, Text, Button, View } from "@aws-amplify/ui-react";
import CheckIcon from "./CheckIconCircleBlack";
import StarsIconSolid from "./StarsIconSolid";
import DotHorizontal from "./DotHorizontal";

export default function List({ text, isFavorites }) {
  return (
    <Flex
      as="div"
      ariaLabel="View example"
      flexDirection="row"
      justifyContent="space-between"
      backgroundColor="rgba(255,255,255,0.4)"
      borderRadius="6px"
      height="7vh"
      maxWidth="100%"
      margin="4px"
      padding="10px"
    >
      <Flex justifyContent="start" alignItems="center">
        <CheckIcon width={32} height={32} />
        <Text>{text}</Text>
      </Flex>
      <View justifyContent="end" alignItems="center">
        <Button size="small" variation="link">
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
  );
}
