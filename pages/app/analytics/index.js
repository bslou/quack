import {
  Button,
  Flex,
  Select,
  Text,
  UnorderedList,
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
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import NavBar from "../navbar";
import Comp from "./comp";

/*
 *
 * under conversations within companies is going to be id of conversation;
 * conversation collection and id as documentation
 * also [messsage, timestamp, and person/robot] as array under messages;
 * also first message date {firstMsgDate};
 * also last message date {lastMsgDate};
 * also id of owner {ownerId};
 * also id of user (ex: const userId = getUserID()) {userId};
 * also video of conversation {vid};
 */

const Analytics = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const data = [
    { name: "Page A", Conversations: 2400, amt: 2400 },
    { name: "Page B", Conversations: 1398, amt: 2210 },
    { name: "Page C", Conversations: 9800, amt: 2290 },
    { name: "Page D", Conversations: 3908, amt: 2000 },
    { name: "Page E", Conversations: 4800, amt: 2181 },
    { name: "Page F", Conversations: 3800, amt: 2500 },
    { name: "Page G", Conversations: 4300, amt: 2100 },
  ];

  const [userId, setUserId] = useState("");

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
          <ModalHeader>User Messages: {userId}</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginTop={5} marginBottom={5} maxHeight={"80%"}>
            <Flex
              direction={"column"}
              maxHeight={"80%"}
              overflowY={"scroll"}
              width={"100%"}
              gap={3}
            >
              <Flex
                direction={"column"}
                width={"100%"}
                alignItems={"flex-end"}
                justifyContent={"center"}
              >
                <Flex
                  maxWidth={"65%"}
                  backgroundColor={"#22CD2C"}
                  paddingTop={2}
                  paddingBottom={2}
                  paddingLeft={5}
                  paddingRight={5}
                  borderRadius={20}
                >
                  <Text color={"white"} fontWeight={500}>
                    Welcome to Russia sir where there is lots of vodka
                  </Text>
                </Flex>
              </Flex>
              <Flex
                direction={"column"}
                width={"100%"}
                alignItems={"flex-start"}
                justifyContent={"center"}
              >
                <Flex
                  maxWidth={"65%"}
                  backgroundColor={"#efefef"}
                  paddingTop={2}
                  paddingBottom={2}
                  paddingLeft={5}
                  paddingRight={5}
                  borderRadius={20}
                >
                  <Text color={"black"} fontWeight={500}>
                    Welcome to Russia sir where there is lots of vodka
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {NavBar("Analytics")}
      <Flex
        overflowY={"scroll"}
        width={"45%"}
        position={"absolute"}
        height={"85vh"}
        top={20}
        left={65 + 20}
        direction={"column"}
        padding={5}
        backgroundColor={"white"}
        borderRadius={3}
        boxShadow={"0 2px 5px #bcbcbc"}
      >
        <Flex
          width={"100%"}
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"80%"}
          >
            <Text fontWeight={500} fontSize={"17pt"}>
              Conversation interactions:
            </Text>
            <Select width={"30%"}>
              <option>Weekly</option>
              <option>Monthly</option>
            </Select>
          </Flex>
          <br />
          {/* Analytics */}
          <LineChart
            width={550}
            height={400}
            data={data}
            margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Conversations" stroke="#8884d8" />
          </LineChart>
        </Flex>
        <br />
        <br />
        {/* Popular questions */}
      </Flex>
      <Flex
        overflowY={"scroll"}
        width={"45%"}
        position={"absolute"}
        height={"85vh"}
        top={20}
        right={10}
        direction={"column"}
        padding={5}
        backgroundColor={"white"}
        borderRadius={3}
        boxShadow={"0 2px 5px #bcbcbc"}
      >
        <Flex
          width={"100%"}
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Flex direction={"column"} alignItems={"flex-start"} width={"100%"}>
            <Flex
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              width={"95%"}
              marginLeft={3}
            >
              <Text fontWeight={500} fontSize={"17pt"}>
                Analyze message interactions:
              </Text>
              <Select width={"30%"}>
                <option>Analyze message interactions</option>
                <option>Message videos</option>
              </Select>
            </Flex>
            <br />
            <Flex direction={"column"} width={"100%"} gap={3}>
              {/* Below is comp */}
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
                onClick={() => {
                  setUserId("");
                  onOpen();
                }}
                width={"100%"}
                borderRadius={5}
                _hover={{
                  backgroundColor: "#e0e0e0",
                  cursor: "pointer",
                }}
              >
                <Text color={"#303030"} fontWeight={700} fontSize={"11pt"}>
                  User ID: 132456
                </Text>
                <Flex direction={"row"} alignItems={"center"} gap={1}>
                  <Text color={"#303030"} fontSize={"11pt"}>
                    Moderately long{" "}
                    {/* to the right is not part of time, to the left is... */}{" "}
                    conversation
                  </Text>
                  <Button as={"div"} size={"auto"} colorScheme={"transparent"}>
                    <Image
                      src={"/assets/menu.png"}
                      alt={"menu"}
                      width={25}
                      height={25}
                    />
                  </Button>
                </Flex>
              </Flex>
              {/* Above is comp */}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Analytics;
