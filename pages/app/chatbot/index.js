import { db, storage } from "@/pages/api/firebaseconfig";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  Text,
  Icon,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  HuePicker,
  PhotoshopPicker,
  SketchPicker,
  SliderPicker,
} from "react-color";
import NavBar from "../navbar";

const Chatbot = () => {
  const [label, setLabel] = useState(false);
  const [name, setName] = useState("Jack");
  const [lob, setLob] = useState("");
  const [value, setValue] = useState("right");
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [widget, setWidget] = useState(true);
  const [opt, setOpt] = useState("Both on desktop and mobile devices");
  const [bgcolor, setBgcolor] = useState("ff0000");
  const [sound, setSound] = useState(false);

  const [it, setIt] = useState(false);

  const toast = useToast();

  useEffect(() => {
    db.collection("users")
      .doc(localStorage.getItem("id"))
      .get()
      .then((val) => {
        db.collection("companies")
          .doc(val.get("isActive"))
          .onSnapshot((snapshot) => {
            let data = snapshot.data();
            setWidget(data.display == "yes" ? true : false);
            setOpt(data.devices);
            setBgcolor(data.bgcolor);
            setSound(data.widgetsounds == "yes" ? true : false);
            setLabel(data.buttonlabel == "yes" ? true : false);
            setLob(data.labeltext);
            setName(data.username);
            setValue(data.widgetpos);
            if (data.brandlogo != "") {
              storage
                .ref(data.brandlogo)
                .getDownloadURL()
                .then((url) => {
                  setFile(url);
                });
            }
            if (data.avatar != "") {
              storage
                .ref(data.avatar)
                .getDownloadURL()
                .then((url) => {
                  setFile2(url);
                });
            }
          });
      });
  }, [db]);

  const changeData = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(localStorage.getItem("id"))
      .get()
      .then((val) => {
        db.collection("companies")
          .doc(val.get("isActive"))
          .onSnapshot((snap) => {
            let data = snap.data();
            if (file != null) {
              //const url = URL.createObjectURL(file);
              const imgname = file.name;
              const imgname2 = file2.name;
              if (file2 != null) {
                if (data.avatar != "") {
                  storage
                    .ref(data.avatar)
                    .getDownloadURL()
                    .then((url) => {
                      if (file2 !== url) {
                        storage
                          .ref(`/images/${imgname2}`)
                          .put(file2)
                          .then(() => {
                            console.log("Process was successful");
                          })
                          .catch((err) => {
                            console.log("Error " + err);
                          });
                      }
                    });
                } else {
                  storage
                    .ref(`/images/${imgname2}`)
                    .put(file2)
                    .then(() => {
                      console.log("Process was successful");
                    })
                    .catch((err) => {
                      console.log("Error " + err);
                    });
                }

                if (data.brandlogo != "") {
                  storage
                    .ref(data.brandlogo)
                    .getDownloadURL()
                    .then((url) => {
                      if (file !== url) {
                        storage
                          .ref(`/images/${imgname}`)
                          .put(file)
                          .then(() => {
                            console.log("Process was successful");
                          })
                          .catch((err) => {
                            console.log("Error " + err);
                          });
                      }
                    });
                } else {
                  storage
                    .ref(`/images/${imgname}`)
                    .put(file)
                    .then(() => {
                      console.log("Process was successful");
                    })
                    .catch((err) => {
                      console.log("Error " + err);
                    });
                }
                db.collection("companies")
                  .doc(val.get("isActive"))
                  .update({
                    display: widget == true ? "yes" : "no",
                    widgetsounds: sound == true ? "yes" : "no",
                    bgcolor: bgcolor,
                    devices: opt,
                    labeltext: lob,
                    username: name,
                    widgetpos: value,
                    buttonlabel: label == true ? "yes" : "no",
                    brandlogo: `/images/${imgname}`,
                    avatar: `/images/${imgname2}`,
                  });
              } else {
                if (data.brandlogo != "") {
                  storage
                    .ref(data.brandlogo)
                    .getDownloadURL()
                    .then((url) => {
                      if (file !== url) {
                        storage
                          .ref(`/images/${imgname}`)
                          .put(file)
                          .then(() => {
                            console.log("Process was successful");
                          })
                          .catch((err) => {
                            console.log("Error " + err);
                          });
                      }
                    });
                } else {
                  storage
                    .ref(`/images/${imgname}`)
                    .put(file)
                    .then(() => {
                      console.log("Process was successful");
                    })
                    .catch((err) => {
                      console.log("Error " + err);
                    });
                }
                db.collection("companies")
                  .doc(val.get("isActive"))
                  .update({
                    display: widget == true ? "yes" : "no",
                    widgetsounds: sound == true ? "yes" : "no",
                    bgcolor: bgcolor,
                    devices: opt,
                    labeltext: lob,
                    username: name,
                    widgetpos: value,
                    buttonlabel: label == true ? "yes" : "no",
                    brandlogo: `/images/${imgname}`,
                    avatar: `/images/${imgname2}`,
                  });
              }
            } else {
              db.collection("companies")
                .doc(val.get("isActive"))
                .update({
                  display: widget == true ? "yes" : "no",
                  bgcolor: bgcolor,
                  devices: opt,
                  labeltext: lob,
                  username: name,
                  widgetpos: value,
                  buttonlabel: label == true ? "yes" : "no",
                });
            }
            toast({
              title: "Successfully updated!",
              isClosable: true,
              status: "correct",
              duration: 3000,
            });
          });
      });
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFileUpload2 = (e) => {
    setFile2(e.target.files[0]);
  };
  return (
    <Flex
      direction={"row"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      backgroundColor={"#F2F7FF"}
    >
      {NavBar("Chatbot")}
      <Flex
        width={"42.5vw"}
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
          gap={2}
          paddingBottom={3}
          borderBottom={"1px solid #f0f0f0"}
        >
          <Image
            src={"/assets/prof.png"}
            alt={"Profile"}
            width={25}
            height={25}
          />
          <Text>Personal Info</Text>
        </Flex>
        <br />
        <form onSubmit={(e) => changeData(e)}>
          <Flex
            direction={"column"}
            alignItems={"center"}
            width={"100%"}
            gap={1}
            maxHeight={"95%"}
          >
            <Flex
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              width={"100%"}
              height={9}
            >
              <Text width={"30%"}>Display Widget:</Text>
              <Switch
                width={"65%"}
                isChecked={widget}
                onChange={() => setWidget(!widget)}
              />
            </Flex>
            <Flex
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              width={"100%"}
              height={9}
            >
              <Text width={"30%"}>Devices:</Text>
              <Select
                width={"65%"}
                value={opt}
                onChange={(e) => setOpt(e.target.value)}
              >
                <option value="Both on desktop and mobile devices">
                  Both on desktop and mobile devices
                </option>
                <option value="Only on desktop devices">
                  Only on desktop devices
                </option>
                <option value="Only on mobile devices">
                  Only on mobile devices
                </option>
              </Select>
            </Flex>
            <Flex
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              width={"100%"}
              height={9}
            >
              <Text width={"30%"}>Background Color:</Text>
              <HuePicker
                color={bgcolor}
                onChange={(color) => setBgcolor(color.hex)}
                width={"65%"}
              />
            </Flex>
            <Flex
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              width={"100%"}
              height={9}
            >
              <Text width={"30%"}>Name:</Text>
              <Input
                width={"65%"}
                value={name}
                placeholder={"Jack"}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Flex>
            <Flex
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              width={"100%"}
              height={9}
            >
              <Text width={"30%"}>Widget Position:</Text>
              <RadioGroup width={"65%"} onChange={setValue} value={value}>
                <Stack direction="row">
                  <Radio value="left">Left</Radio>
                  <Radio value="right">Right</Radio>
                </Stack>
              </RadioGroup>
            </Flex>
            <Flex
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              width={"100%"}
              height={9}
            >
              <Text width={"30%"}>Button Label:</Text>
              <Switch
                width={"65%"}
                onChange={() => setLabel(!label)}
                isChecked={label}
              />
            </Flex>
            {label ? (
              <Flex
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
                height={9}
                marginBottom={7}
              >
                <Text width={"30%"} required>
                  Label Text:
                </Text>
                <Input
                  width={"65%"}
                  placeholder={"Example: Chatbot"}
                  value={lob}
                  onChange={(e) => setLob(e.target.value)}
                  required
                />
              </Flex>
            ) : null}
            {/* <Flex
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              width={"100%"}
              height={9}
            >
              <Text width={"30%"}>Widget Sounds:</Text>
              <Switch
                width={"65%"}
                isChecked={sound}
                onChange={(e) => setSound(e.target.value)}
              />
            </Flex> */}
            <Flex
              direction={"row"}
              alignItems={"center"}
              //justifyContent={"center"}
              width={"100%"}
              height={16}
              paddingBottom={5}
            >
              <Text width={"30%"} marginLeft={4}>
                Brand Logo:
              </Text>
              <Flex alignItems="left" justifyContent="flex-start" width={"65%"}>
                <Button
                  as="label"
                  size="lg"
                  rounded="full"
                  bg="gray.500"
                  color="white"
                  width={50}
                  height={50}
                >
                  <AddIcon />
                  <Input
                    type="file"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                    accept="image/png, image/gif, image/jpeg"
                  />
                </Button>
                {console.log(typeof file)}
                {file && (
                  <img
                    src={
                      typeof file == "string" ? file : URL.createObjectURL(file)
                    }
                    alt="Selected"
                    width={75}
                    height={75}
                  />
                )}
              </Flex>
            </Flex>
            <Flex
              direction={"row"}
              alignItems={"center"}
              //justifyContent={"center"}
              width={"100%"}
              height={16}
              paddingBottom={5}
              borderBottom={"1px solid #efefef"}
            >
              <Text width={"30%"} marginLeft={4}>
                Chat Avatar:
              </Text>
              <Flex alignItems="left" justifyContent="flex-start" width={"65%"}>
                <Button
                  as="label"
                  size="lg"
                  rounded="full"
                  bg="gray.500"
                  color="white"
                  width={50}
                  height={50}
                >
                  <AddIcon />
                  <Input
                    type="file"
                    onChange={handleFileUpload2}
                    style={{ display: "none" }}
                    accept="image/png, image/gif, image/jpeg"
                  />
                </Button>
                {console.log(typeof file2)}
                {file2 && (
                  <img
                    src={
                      typeof file2 == "string"
                        ? file2
                        : URL.createObjectURL(file2)
                    }
                    alt="Selected"
                    width={75}
                    height={75}
                  />
                )}
              </Flex>
            </Flex>
            <Button
              marginTop={2}
              type="submit"
              colorScheme={"blue"}
              width={150}
            >
              Save
            </Button>
          </Flex>
        </form>
      </Flex>
      <Flex
        width={"42.5vw"}
        position={"absolute"}
        height={"85vh"}
        top={20}
        right={65}
        direction={"column"}
        padding={5}
        backgroundColor={"white"}
        borderRadius={3}
        boxShadow={"0 2px 5px #bcbcbc"}
        //backgroundImage={"url('/assets/png.png')"}
        backgroundSize={"100% 100%"}
      >
        {widget ? (
          <>
            {!it && label ? (
              <Flex
                backgroundColor={"white"}
                paddingLeft={3}
                paddingRight={3}
                paddingTop={1}
                paddingBottom={1}
                borderRadius={15}
                boxShadow={"0 0 5px #ababab"}
                maxWidth={100}
                alignItems={"center"}
                justifyContent={"center"}
                position={"absolute"}
                bottom={10}
                right={value == "right" ? 105 : null}
                left={value == "left" ? 105 : null}
              >
                <Text color={"black"}>{lob}</Text>
              </Flex>
            ) : null}
            {!it && (
              <Button
                width={75}
                height={75}
                position={"absolute"}
                bottom={5}
                right={value == "right" ? 5 : null}
                left={value == "left" ? 5 : null}
                borderRadius={"50%"}
                backgroundColor={bgcolor}
                _hover={{
                  opacity: 0.7,
                }}
                colorScheme={"transparent"}
                onClick={() => setIt(!it)}
              >
                {!it ? (
                  file !== null ? (
                    <img
                      src={file}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  ) : (
                    <Image
                      src={"/assets/mail.png"}
                      alt={"mail"}
                      width={50}
                      height={50}
                    />
                  )
                ) : (
                  <Image
                    src={"/assets/x.png"}
                    alt={"Close it"}
                    width={35}
                    height={35}
                  />
                )}
              </Button>
            )}
            {it ? (
              <Flex
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                width={400}
                height={450}
                borderRadius={8}
                boxShadow={"0 0 10px #ababab"}
                position={"absolute"}
                bottom={5}
                right={value == "right" ? 5 : null}
                left={value == "left" ? 5 : null}
              >
                <Flex
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"100%"}
                  height={"15%"}
                  backgroundColor={bgcolor}
                  borderTopRadius={8}
                  paddingLeft={5}
                  paddingRight={0.5}
                >
                  <Flex
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={3}
                  >
                    {file2 != null ? (
                      <img
                        src={file2}
                        alt="Logo"
                        width={50}
                        height={50}
                        borderRadius={25}
                      />
                    ) : null}
                    <Text color={"white"} fontWeight={700}>
                      Chat with {name}
                    </Text>
                  </Flex>
                  <Button
                    colorScheme={"transparent"}
                    _hover={{
                      opacity: 0.5,
                    }}
                    onClick={() => setIt(!it)}
                  >
                    <Image
                      src={"/assets/x.png"}
                      alt={"Close it"}
                      width={20}
                      height={20}
                    />
                  </Button>
                </Flex>
                <Flex
                  backgroundColor={"white"}
                  direction={"column"}
                  width={"100%"}
                  height={"75%"}
                  gap={3}
                  marginTop={3}
                  marginBottom={3}
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
                      marginRight={3}
                    >
                      <Text color={"white"} fontWeight={500}>
                        This is a test message from a person texting to chatbot
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
                      marginLeft={3}
                    >
                      <Text color={"black"} fontWeight={500}>
                        This is a test message from a robot texting to chatbot
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  direction={"column"}
                  width={"100%"}
                  height={"10%"}
                  justifyContent={"center"}
                  borderTop={"1px solid #efefef"}
                  backgroundColor={"white"}
                  borderBottomRadius={5}
                >
                  <Input
                    width={"100%"}
                    height={"100%"}
                    placeholder={"Disabled for example purposes..."}
                    disabled
                    border={"none"}
                  />
                </Flex>
              </Flex>
            ) : null}
          </>
        ) : null}
      </Flex>
    </Flex>
  );
};

export default Chatbot;
