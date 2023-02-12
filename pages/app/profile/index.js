import { db } from "@/pages/api/firebaseconfig";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavBar from "../navbar";

const Profile = () => {
  const [phone, setPhone] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    db.collection("users")
      .doc(localStorage.getItem("id"))
      .get()
      .then((val) => {
        setFirstname(val.get("firstname"));
        setLastname(val.get("lastname"));
        setPhone(val.get("phone"));
      });
  }, []);

  const Logout = () => {
    localStorage.removeItem("id");
    router.push("/");
  };

  const updateProfile = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(localStorage.getItem("id"))
      .update({ firstname: firstname, lastname: lastname, phone: phone });
    toast({
      title: "Updated successfully",
      status: "correct",
      isClosable: "true",
      duration: 3000,
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to proceed with logging out?
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button colorScheme={"blue"} onClick={Logout}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {NavBar("Profile")}
      <form onSubmit={(e) => updateProfile(e)}>
        <Flex
          width={"40vw"}
          position={"absolute"}
          height={"85vh"}
          top={20}
          left={"32%"}
          direction={"column"}
          alignItems={"center"}
          padding={5}
          backgroundColor={"white"}
          borderRadius={3}
          boxShadow={"0 2px 5px #bcbcbc"}
          gap={3}
        >
          <Flex
            direction={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
            width={"92%"}
            marginBottom={1}
          >
            <Text fontWeight={500} fontSize={"17pt"}>
              Change Data
            </Text>
          </Flex>
          <FormControl isRequired width={"90%"}>
            <FormLabel>First name</FormLabel>
            <Input
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="First name"
              minLength={2}
              value={firstname}
              required
            />
          </FormControl>
          <FormControl isRequired width={"90%"}>
            <FormLabel>Last name</FormLabel>
            <Input
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Last name"
              minLength={2}
              value={lastname}
              required
            />
          </FormControl>
          <FormControl isRequired width={"90%"}>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type={"tel"}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              minLength={6}
              maxLength={15}
              value={phone}
              required
            />
          </FormControl>
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={10}
            width={"100%"}
          >
            <Button type="submit" colorScheme={"blue"} width={"25%"}>
              Save
            </Button>
            <Button onClick={onOpen} colorScheme={"red"} width={"25%"}>
              Logout
            </Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};

export default Profile;
