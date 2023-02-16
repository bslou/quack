import { db } from "@/pages/api/firebaseconfig";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { arrayUnion } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import NavBar from "../navbar";
import Comp from "./comp";

const Prompt = () => {
  const [ques, setQues] = useState("");
  const [ans, setAns] = useState("");
  const [rows, setRows] = useState([]);
  const [num, setNum] = useState(0);
  const [numDelete, setNumDelete] = useState(0);

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
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        colorScheme={"red"}
                        onClick={() => {
                          setNumDelete(JSON.parse(data.prompts).length - 1 - i);
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
            } else {
              let arr = [];
              arr.push([ques, ans]);
              db.collection("companies")
                .doc(val.get("isActive"))
                .update({ prompts: JSON.stringify(arr) });
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
