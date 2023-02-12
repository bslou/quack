import { Button, Flex, Select, Text, UnorderedList } from "@chakra-ui/react";
import Image from "next/image";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import NavBar from "../navbar";
import Comp from "./comp";

const Analytics = () => {
  const data = [
    { name: "Page A", Conversations: 2400, amt: 2400 },
    { name: "Page B", Conversations: 1398, amt: 2210 },
    { name: "Page C", Conversations: 9800, amt: 2290 },
    { name: "Page D", Conversations: 3908, amt: 2000 },
    { name: "Page E", Conversations: 4800, amt: 2181 },
    { name: "Page F", Conversations: 3800, amt: 2500 },
    { name: "Page G", Conversations: 4300, amt: 2100 },
  ];

  return (
    <Flex
      direction={"row"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      backgroundColor={"#F2F7FF"}
    >
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
              {Comp("132456", "Moderately long")}
              {Comp("132456", "Moderately long")}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Analytics;
