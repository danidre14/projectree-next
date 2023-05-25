"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") return router.replace("/signin");
  }, [status]);

  if (status === "unauthenticated") {
    return (<></>);
  }

  return <div>Dashboard</div>;
};

export default Dashboard;
