import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";

const Comp = (ques, ans) => {
  const [editable, setEditable] = useState(true);
  const [txt1, setTxt1] = useState(ques);
  const [txt2, setTxt2] = useState(ans);
  return (
    <Flex
      direction={"row"}
      justifyContent={"center"}
      alignItems={"flex-end"}
      gap={5}
      width={"100%"}
    >
      <Input
        backgroundColor={"white"}
        width={editable ? "40%" : "31.5%"}
        readOnly={editable}
        value={txt1}
        onChange={(e) => setTxt1(e.target.value)}
      />
      <Input
        backgroundColor={"white"}
        width={editable ? "40%" : "31.5%"}
        readOnly={editable}
        value={txt2}
        onChange={(e) => setTxt2(e.target.value)}
      />
      <Button
        colorScheme={editable ? "green" : "blue"}
        onClick={() => setEditable(!editable)}
      >
        {editable ? "Edit" : "Change"}
      </Button>
      {editable ? null : <Button colorScheme={"red"}>Delete</Button>}
      {editable ? null : (
        <Button onClick={() => setEditable(!editable)}>Cancel</Button>
      )}
    </Flex>
  );
};

export default Comp;
