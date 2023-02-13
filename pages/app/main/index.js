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
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import NavBar from "../navbar";
import Comp from "./comp";

const Main = () => {
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
            .onSnapshot((valo) => {
              setRows((prevRows) => [
                ...prevRows,
                Comp(
                  element,
                  valo.data().name,
                  valo.data().executed,
                  //valo.data().engagement,
                  element == val.get("isActive")
                ),
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
