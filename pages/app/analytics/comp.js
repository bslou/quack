const { Flex, Text, Button } = require("@chakra-ui/react");
const { default: Image } = require("next/image");

const Comp = (ido, time) => {
  return (
    <Flex
      direction={"row"}
      alignItems={"center"}
      backgroundColor={"#f0f0f0"}
      justifyContent={"space-between"}
      paddingLeft={3}
      paddingRight={3}
      paddingTop={3}
      paddingBottom={3}
      gap={10}
      as={"a"}
      width={"100%"}
      borderRadius={5}
      _hover={{
        backgroundColor: "#e0e0e0",
        cursor: "pointer",
      }}
    >
      <Text color={"#303030"} fontWeight={700} fontSize={"11pt"}>
        User ID: {ido}
      </Text>
      <Flex direction={"row"} alignItems={"center"} gap={1}>
        <Text color={"#303030"} fontSize={"11pt"}>
          {time} conversation
        </Text>
        <Button as={"div"} size={"auto"} colorScheme={"transparent"}>
          <Image src={"/assets/menu.png"} alt={"menu"} width={25} height={25} />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Comp;
