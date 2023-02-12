import { EmailIcon, LockIcon, PhoneIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { Flex, Button, Text, Input, Link } from "@chakra-ui/react";
import Head from "next/head";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "@/pages/api/firebaseconfig";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const LogSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pwd).then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem("id", user.uid);
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((val) => {
          if (!val.exists) return;
          router.push("/app/main");
        });
    });
  };
  return (
    <>
      <Head>
        <title>Quack - Login Page</title>
        <meta
          name="description"
          content="Unlock the power of AI for your marketing and user retention efforts with Quack, the startup revolutionizing cold calling. Let our cutting-edge technology take the lead in reaching and engaging with your target audience, resulting in increased conversions and customer satisfaction."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100vw"}
        height={"100vh"}
      >
        <Flex
          direction={"column"}
          alignItems={"flex-start"}
          padding={10}
          gap={10}
          backgroundColor={"#548FF1"}
          width={"50vw"}
          height={"100vh"}
        >
          <Flex
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Image
              src={"/assets/duck.png"}
              alt={"Chatbot, Quack ringer"}
              width={50}
              height={50}
            />
            <Button
              colorScheme={"transparent"}
              color={"#fff"}
              fontSize={"18pt"}
              fontWeight={900}
              onClick={() => router.push("/")}
            >
              Quack
            </Button>
          </Flex>
          <Text color={"white"} fontWeight={600} fontSize={"27pt"}>
            Have a smart chatbot that provides customer support based on
            companies info.
          </Text>
          <Flex marginLeft={400} width={300} height={300}>
            <Image
              src={"/assets/chat.png"}
              alt={"Quack chatbot"}
              layout={"responsive"}
              width={300}
              height={300}
            />
          </Flex>
        </Flex>
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          backgroundColor={"#fff"}
          width={"50vw"}
          height={"100vh"}
          gap={3}
        >
          <Text fontWeight={600} fontSize={"33pt"} textAlign={"center"}>
            Login to Quack
          </Text>
          <Text color={"gray"} fontSize={"17pt"} textAlign={"center"}>
            It's time to promote.
          </Text>
          <form
            onSubmit={(e) => {
              LogSubmit(e);
            }}
          >
            <Flex
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              width={"50vw"}
              gap={5}
            >
              <Flex
                direction={"row"}
                alignItems={"center"}
                border={"1px solid #d9d9d9"}
                borderRadius={15}
                backgroundColor={"#efefef"}
                paddingLeft={7}
                paddingRight={7}
                paddingTop={2}
                paddingBottom={2}
                width={"70%"}
              >
                <EmailIcon boxSize={5} />
                <Input
                  type={"email"}
                  placeholder="Email..."
                  border={"none"}
                  outline={"none"}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Flex>
              <Flex
                direction={"row"}
                alignItems={"center"}
                border={"1px solid #d9d9d9"}
                borderRadius={15}
                backgroundColor={"#efefef"}
                paddingLeft={7}
                paddingRight={7}
                paddingTop={2}
                paddingBottom={2}
                width={"70%"}
              >
                <LockIcon boxSize={5} />
                <Input
                  type={"password"}
                  placeholder="Password..."
                  border={"none"}
                  outline={"none"}
                  onChange={(e) => setPwd(e.target.value)}
                  required
                />
              </Flex>
              <Button
                backgroundColor={"#548FF1"}
                borderRadius={10}
                width={"70%"}
                paddingTop={7}
                paddingBottom={7}
                color={"white"}
                type={"submit"}
              >
                Continue
              </Button>
              <Flex
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Text fontWeight={400}>Don't have an account?&nbsp;</Text>
                <Link
                  onClick={() => router.push("/c/register")}
                  fontWeight={400}
                  color={"#548FF1"}
                >
                  Sign Up
                </Link>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </>
  );
};

export default Login;
