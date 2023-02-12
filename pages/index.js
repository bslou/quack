import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      router.push("/c/register");
    } else {
      router.push("/app/main");
    }
  }, []);
  return (
    <>
      <Head>
        <title>Quack - Customer Service Chatbot</title>
        <meta
          name="description"
          content="Unlock the power of AI for your marketing and user retention efforts with Call-It, the startup revolutionizing cold calling. Let our cutting-edge technology take the lead in reaching and engaging with your target audience, resulting in increased conversions and customer satisfaction."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
