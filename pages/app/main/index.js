import { db } from "@/pages/api/firebaseconfig";
import {
  Button,
  Checkbox,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Link,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavBar from "../navbar";

const Main = () => {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [name, setName] = useState("");
  const [nom, setNom] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    db.collection("users")
      .doc(localStorage.getItem("id"))
      .get()
      .then((val) => {
        setRows([]);
        val.get("companies").forEach((element) => {
          db.collection("companies")
            .doc(element)
            .onSnapshot((valo) => {
              setRows((prevRows) => [
                ...prevRows,
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
                      onClick={() => {
                        db.collection("users")
                          .doc(localStorage.getItem("id"))
                          .update({ isActive: element });
                        router.push("/app/chatbot");
                      }}
                      fontSize={"11pt"}
                      fontWeight={700}
                      color={"black"}
                    >
                      {valo.data().name}
                    </Link>
                    <Text>{element}</Text>
                  </Flex>
                  <Flex
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    width={"18.5%"}
                  >
                    <Text fontSize={"11pt"} color={"black"}>
                      {valo.data().executed}
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
                        isChecked={element == val.get("isActive")}
                        onChange={() => {
                          if (!(element == val.get("isActive"))) {
                            db.collection("users")
                              .doc(localStorage.getItem("id"))
                              .update({ isActive: element })
                              .then((val) => window.location.reload());
                          }
                        }}
                      />
                      <Menu>
                        <MenuButton
                          as={"div"}
                          size={"auto"}
                          colorScheme={"transparent"}
                        >
                          <Image
                            src={"/assets/menu.png"}
                            alt={"menu"}
                            width={25}
                            height={25}
                          />
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            onClick={() => {
                              setNom(element);
                              setName(valo.data().name);
                              onOpen();
                            }}
                          >
                            Edit {valo.data().name}
                          </MenuItem>
                          <MenuItem>Delete {valo.data().name}</MenuItem>
                        </MenuList>
                      </Menu>
                    </Flex>
                  </Flex>
                </Flex>,
              ]);
            });
        });
      });
  }, [db]);
  return (
    <Flex
      direction={"row"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      backgroundColor={"#F2F7FF"}
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Company Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                //setRows([]);
                db.collection("companies")
                  .doc(nom)
                  .update({ name: name })
                  .then((e) => {
                    onClose();
                    setName("");
                    window.location.reload();
                  });
              }}
            >
              <Flex
                direction={"column"}
                alignItems={"center"}
                width={"100%"}
                gap={3}
              >
                <Flex direction={"column"} width={"100%"}>
                  <Text>Company Name</Text>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Flex>
                <Flex
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={3}
                >
                  <Button type="submit" colorScheme={"green"}>
                    Update Name
                  </Button>
                  <Button onClick={onClose} colorScheme={"blue"}>
                    Cancel
                  </Button>
                </Flex>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      {NavBar("Dashboard")}
      <Flex
        width={"85vw"}
        position={"absolute"}
        height={"85vh"}
        top={20}
        left={65 + 70}
        direction={"column"}
        padding={5}
        backgroundColor={"white"}
        borderRadius={3}
        boxShadow={"0 2px 5px #bcbcbc"}
      >
        <Flex
          direction={"row"}
          alignItems={"center"}
          width={"100%"}
          justifyContent={"space-between"}
          paddingLeft={2.5}
          paddingRight={2.5}
        >
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"30%"}
            gap={10}
          >
            <Text color={"gray"}>Company Name</Text>
            <Text color={"gray"}>API Key (Keep secret)</Text>
          </Flex>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"21%"}
          >
            <Text color={"gray"}>Executed</Text>
            {/* <Text color={"gray"}>Engagement</Text> */}
            <Text color={"gray"}>Selected</Text>
          </Flex>
        </Flex>
        <Flex
          direction={"column"}
          alignItems={"center"}
          gap={3}
          width={"100%"}
          marginTop={1}
        >
          {rows}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Main;
