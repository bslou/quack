import {
  Checkbox,
  Flex,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const Comp = (id, name, exec, selected) => {
  const router = useRouter();
  return (
    <Flex
      as={"a"}
      _hover={{
        backgroundColor: "#efefef",
        //cursor: "pointer",
      }}
      backgroundColor={"white"}
      width={"100%"}
      alignItems={"center"}
      gap={6}
      justifyContent={"space-between"}
      paddingTop={2.5}
      paddingBottom={2.5}
      paddingLeft={2.5}
      paddingRight={2.5}
      borderRadius={5}
    >
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"33%"}
      >
        <Link
          onClick={() => router.push("/app/chatbot")}
          fontSize={"11pt"}
          fontWeight={700}
          color={"black"}
        >
          {name}
        </Link>
        <Text>{id}</Text>
      </Flex>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"18.5%"}
      >
        <Text fontSize={"11pt"} color={"black"}>
          {exec}
        </Text>
        {/* <Text fontSize={"11pt"} color={"black"}>
          {engage}%
        </Text> */}
        <Flex
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
        >
          <Checkbox
            isChecked={selected}
            onChange={() => {
              if (!selected) {
                db.collection("users")
                  .doc(localStorage.getItem("id"))
                  .update({ isActive: id });
              }
            }}
          />
          <Menu>
            <MenuButton as={"div"} size={"auto"} colorScheme={"transparent"}>
              <Image
                src={"/assets/menu.png"}
                alt={"menu"}
                width={25}
                height={25}
              />
            </MenuButton>
            <MenuList>
              <MenuItem>Edit {name}</MenuItem>
              <MenuItem>Delete {name}</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Comp;
