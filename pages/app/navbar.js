import {
  Button,
  Flex,
  Select,
  Text,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../api/firebaseconfig";
import { arrayUnion, arrayRemove, serverTimestamp } from "firebase/firestore";

const NavBar = (name) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nom, setNom] = useState();
  const router = useRouter();
  const toast = useToast();
  const [namer, setNamer] = useState("");

  const [rows, setRows] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(localStorage.getItem("id"))
      .get()
      .then((val) => {
        setRows([]);
        val.get("companies").forEach((element) => {
          db.collection("companies")
            .doc(element)
            .onSnapshot((snap) => {
              let data = snap.data();
              if (val.get("isActive") == snap.id) {
                setNamer(data.name + " - ");
              }
              setRows((opt) => [
                ...opt,
                <option value={snap.id}>{data.name}</option>,
              ]);
            });
        });
      });
  }, [db]);

  const RegCompany = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(localStorage.getItem("id"))
      .get()
      .then((val) => {
        if (!val.get("companies").includes(nom)) {
          db.collection("companies")
            .add({
              date: serverTimestamp(),
              name: nom,
              executed: 0,
              engagement: "Unknown",
              display: "yes",
              devices: "Both on desktop and mobile devices",
              bgcolor: "#ff0000",
              onlinestatus: "We will reply immediately...",
              widgetpos: "right",
              buttonlabel: "no",
              labeltext: "Welcome",
              widgetsounds: "no",
              brandlogo: "",
              prompts: "",
              conversations: [],
              videos: [],
            })
            .then((vo) => {
              db.collection("users")
                .doc(localStorage.getItem("id"))
                .update({ companies: arrayUnion(vo.id) });
              db.collection("users")
                .doc(localStorage.getItem("id"))
                .update({ isActive: vo.id });
            });
          setNom("");
          onClose();
        } else {
          toast({
            title: "Company name already exists within your companies",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };
  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Companybot</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={(e) => RegCompany(e)}>
              <Flex
                direction={"column"}
                alignItems={"flex-start"}
                justifyContent={"center"}
                gap={3}
              >
                <Text>What is the name of your company?</Text>
                <Input
                  required
                  minLength={2}
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                />
                <Flex
                  direction={"row"}
                  width={"100%"}
                  alignItems={"center"}
                  justifyContent={"flex-end"}
                  gap={3}
                >
                  <Button type="submit" colorScheme="blue">
                    Create
                  </Button>
                  <Button mr={3} onClick={onClose}>
                    Close
                  </Button>
                </Flex>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex
        direction={"row"}
        backgroundColor={"white"}
        position={"absolute"}
        left={66}
        width={"100%"}
        top={0}
        justifyContent={"space-between"}
        alignItems={"center"}
        boxShadow={"0px 3px 5px #e0e0e0"}
        paddingLeft={5}
        paddingTop={2}
        paddingBottom={2}
        paddingRight={2}
      >
        <Text fontSize={"17pt"}>
          {name == "Dashboard"
            ? "🏠"
            : name == "Chatbot"
            ? "🤖"
            : name == "Analytics"
            ? "📈"
            : name == "Prompts"
            ? "📝"
            : "👤"}
          &nbsp;&nbsp;
          {name != "Dashboard" && name != "Profile" ? namer : ""} {name}
        </Text>

        <Flex
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={3}
        >
          {name != "Dashboard" && name != "Profile" ? (
            <Select
              marginRight={75}
              width={100}
              _hover={{
                backgroundColor: "#ebebeb",
                cursor: "pointer",
              }}
              onChange={(e) => {
                db.collection("users")
                  .doc(id)
                  .update({ isActive: e.target.value });
              }}
            >
              {rows}
            </Select>
          ) : null}
          {name == "Dashboard" ? (
            <Button marginRight={75} colorScheme={"green"} onClick={onOpen}>
              Create Companybot
            </Button>
          ) : null}
        </Flex>
      </Flex>
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={65}
        backgroundColor={"#113363"}
        height={"100%"}
      >
        <Flex direction={"column"} width={"100%"}>
          <Tooltip label={"Dashboard"}>
            <Button
              colorScheme={"transparent"}
              width={65}
              height={65}
              _hover={{
                backgroundColor: "#0A1E3A",
              }}
              borderRadius={0}
              backgroundColor={name == "Dashboard" ? "#0A1E3A" : "transparent"}
              onClick={() => router.push("/app/main")}
            >
              <Image
                src={"/assets/home.png"}
                alt={"home dashboard"}
                width={65}
                height={65}
              />
            </Button>
          </Tooltip>
          <Tooltip label={"Model prompts"}>
            <Button
              colorScheme={"transparent"}
              width={65}
              height={65}
              _hover={{
                backgroundColor: "#0A1E3A",
              }}
              borderRadius={0}
              backgroundColor={name == "Prompts" ? "#0A1E3A" : "transparent"}
              onClick={() => router.push("/app/prompt")}
            >
              <Image
                src={"/assets/tasks.png"}
                alt={"tasks"}
                width={65}
                height={65}
              />
            </Button>
          </Tooltip>
          <Tooltip label={"Chatbot"}>
            <Button
              colorScheme={"transparent"}
              width={65}
              height={65}
              _hover={{
                backgroundColor: "#0A1E3A",
              }}
              borderRadius={0}
              backgroundColor={name == "Chatbot" ? "#0A1E3A" : "transparent"}
              onClick={() => router.push("/app/chatbot")}
            >
              <Image
                src={"/assets/chatbot.png"}
                alt={"chatbot"}
                width={65}
                height={65}
              />
            </Button>
          </Tooltip>
          <Tooltip label={"Analytics"}>
            <Button
              colorScheme={"transparent"}
              width={65}
              height={65}
              _hover={{
                backgroundColor: "#0A1E3A",
              }}
              onClick={() => router.push("/app/analytics")}
              borderRadius={0}
              backgroundColor={name == "Analytics" ? "#0A1E3A" : "transparent"}
            >
              <Image
                src={"/assets/analytics.png"}
                alt={"analytics"}
                width={65}
                height={65}
              />
            </Button>
          </Tooltip>
        </Flex>
        <Tooltip label={"Profile"}>
          <Button
            colorScheme={"transparent"}
            width={65}
            height={65}
            _hover={{
              backgroundColor: "#0A1E3A",
            }}
            borderRadius={0}
            backgroundColor={name == "Profile" ? "#0A1E3A" : "transparent"}
            onClick={() => router.push("/app/profile")}
          >
            <Image
              src={"/assets/profile.png"}
              alt={"profile"}
              width={65}
              height={65}
            />
          </Button>
        </Tooltip>
      </Flex>
    </>
  );
};

export default NavBar;
