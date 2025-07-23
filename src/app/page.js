"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home(props) {
  const router = useRouter();

  useEffect(() => {
    router.push("/landing/?lang=fa");
  }, []);

  return null;
}