"use client";

import { Authform } from "@/components";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/utils/service/api";
import { Loader } from "@/components";

export default function Home() {
const [loading , setLoading] = useState(true)
  const router = useRouter();
  useEffect(() => {
    async function isActiveSession() {
      const res = await API.getSession();

      if (res.error) {
        setLoading(!loading)
        // router.push("/");

      }else {
        router.push("/homecards")
      }
    }
    isActiveSession();
  },[]);

  return loading? <Loader/> :<Authform />;
}
