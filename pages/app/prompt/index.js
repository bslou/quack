import { db } from "@/pages/api/firebaseconfig";
import {
  Button,
  Flex,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { arrayUnion } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import NavBar from "../navbar";

const Prompt = () => {
  const [ques, setQues] = useState("");
  const [ans, setAns] = useState("");
  const [rows, setRows] = useState([]);
  const [num, setNum] = useState(0);
  const [numDelete, setNumDelete] = useState(0);
  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isOpen2, setIsOpen2] = useState(false);
  const onClose2 = () => setIsOpen2(false);
  const cancelRef = useRef();

  useEffect(() => {
    db.collection("users")
      .doc(localStorage.getItem("id"))
      .get()
      .then((val) => {
        db.collection("companies")
          .doc(val.get("isActive"))
          .onSnapshot((snap) => {
            let data = snap.data();
            if (data.prompts != "") {
              setRows([]);
              JSON.parse(data.prompts)
                .reverse()
                .forEach(function (element, i) {
                  setRows((prevRows) => [
                    ...prevRows,
                    <Flex
                      direction={"row"}
                      justifyContent={"center"}
                      alignItems={"flex-end"}
                      gap={5}
                      width={"100%"}
                    >
                      <Input
                        backgroundColor={"white"}
                        width={"36.5%"}
                        readOnly={true}
                        value={element[0]}
                      />
                      <Input
                        backgroundColor={"white"}
                        width={"36.5%"}
                        readOnly={true}
                        value={element[1]}
                      />
                      <Button
                        colorScheme={"blue"}
                        onClick={() => {
                          setNum(JSON.parse(data.prompts).length - 1 - i);
                          setOne(element[0]);
                          setTwo(element[1]);
                          onOpen();
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        colorScheme={"red"}
                        onClick={() => {
                          setNumDelete(JSON.parse(data.prompts).length - 1 - i);
                          setOne(element[0]);
                          setTwo(element[1]);
                          setIsOpen2(true);
                        }}
                      >
                        Delete
                      </Button>
                    </Flex>,
                  ]);
                });
            }
          });
      });
  }, [db]);

  const editIt = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(localStorage.getItem("id"))
      .get()
      .then((val) => {
        db.collection("companies")
          .doc(val.get("isActive"))
          .onSnapshot((snap) => {
            let data = snap.data();
            let orr = JSON.parse(data.prompts);
            orr[num] = [one, two];
            db.collection("companies")
              .doc(val.get("isActive"))
              .update({ prompts: JSON.stringify(orr) });
            toast({
              title: "Edited prompt #" + String(num),
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            onClose();
          });
      });
  };

  const deleteIt = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(localStorage.getItem("id"))
      .get()
      .then((val) => {
        db.collection("companies")
          .doc(val.get("isActive"))
          .get()
          .then((valo) => {
            let array = JSON.parse(valo.get("prompts"));
            if (array.length > 5) {
              array.splice(num, 1);
              db.collection("companies")
                .doc(val.get("isActive"))
                .update({ prompts: JSON.stringify(array) });
              toast({
                title: "Deleted successfully...",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
              onClose2();
              return;
            } else {
              toast({
                title: "You have to have at least 5 prompts.",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          });
      });
  };

  const addIt = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(localStorage.getItem("id"))
      .get()
      .then((val) => {
        db.collection("companies")
          .doc(val.get("isActive"))
          .get()
          .then((valo) => {
            if (valo.get("prompts")) {
              let arr = JSON.parse(valo.get("prompts"));
              arr.push([ques, ans]);
              db.collection("companies")
                .doc(val.get("isActive"))
                .update({ prompts: JSON.stringify(arr) });
              setQues("");
              setAns("");
              toast({
                title: "Added successfully...",
                status: "success",
                isClosable: true,
                duration: 3000,
              });
            } else {
              let arr = [];
              arr.push([ques, ans]);
              db.collection("companies")
                .doc(val.get("isActive"))
                .update({ prompts: JSON.stringify(arr) });
              setQues("");
              setAns("");
              toast({
                title: "Added successfully...",
                status: "success",
                isClosable: true,
                duration: 3000,
              });
            }
          });
      });
  };
  return (
    <Flex
      direction={"row"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      backgroundColor={"#F2F7FF"}
    >
      <AlertDialog
        isOpen={isOpen2}
        leastDestructiveRef={cancelRef}
        onClose={onClose2}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Item
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete:{" "}
              <b>
                <br />
                <br />
                {one} {two}
                <br />
                <br />
              </b>
              This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose2}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={(e) => deleteIt(e)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Prompt</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={(e) => editIt(e)}>
              <Flex
                direction={"column"}
                alignItems={"center"}
                gap={5}
                width={"100%"}
              >
                <Flex direction={"column"} alignItems={"left"} width={"100%"}>
                  <Text>Question</Text>
                  <Input value={one} onChange={(e) => setOne(e.target.value)} />
                </Flex>
                <Flex direction={"column"} alignItems={"left"} width={"100%"}>
                  <Text>Answer</Text>
                  <Input value={two} onChange={(e) => setTwo(e.target.value)} />
                </Flex>
                <Flex
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={3}
                >
                  <Button colorScheme={"blue"} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme={"green"} type={"submit"}>
                    Change Prompt
                  </Button>
                </Flex>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      {NavBar("Prompts")}
      <Flex
        direction={"column"}
        alignItems={"center"}
        width={"95vw"}
        position={"absolute"}
        height={"85vh"}
        top={20}
        left={65}
      >
        <Text color={"red"} width={"50%"} textAlign={"center"}>
          * You have to have at least 5 prompts, we recommend having over 100
          ("I do not know" prompts are also recommended for enhancing model)
        </Text>
        <br />

        <Flex direction={"column"} width={"100%"} alignItems={"center"} gap={3}>
          <form onSubmit={(e) => addIt(e)}>
            <Flex
              direction={"row"}
              justifyContent={"center"}
              alignItems={"flex-end"}
              gap={5}
              width={"95vw"}
              marginRight={100}
            >
              <Flex
                direction={"column"}
                alignItems={"left"}
                gap={1}
                width={"36.5%"}
              >
                <Text>Questions:</Text>
                <Input
                  backgroundColor={"white"}
                  width={"100%"}
                  placeholder={"How long does it take to ship the gray shirt?"}
                  required
                  value={ques}
                  onChange={(e) => setQues(e.target.value)}
                  minLength={3}
                />
              </Flex>
              <Flex
                direction={"column"}
                alignItems={"left"}
                gap={1}
                width={"36.5%"}
              >
                <Text>Answers:</Text>
                <Input
                  backgroundColor={"white"}
                  width={"100%"}
                  placeholder={"Approximately 4-7 days..."}
                  required
                  value={ans}
                  onChange={(e) => setAns(e.target.value)}
                  minLength={3}
                />
              </Flex>
              <Button colorScheme={"green"} type={"submit"}>
                Add
              </Button>
            </Flex>
          </form>

          <br />
          {rows}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Prompt;
