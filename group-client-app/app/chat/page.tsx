"use client";
import { useEffect, useState } from "react";
import UsersList from "../components/user/UsersList";
import SearchUsers from "../components/user/SearchUsers";
import { usePathname } from "next/navigation";

const Chat = () => {
  const [data, setData] = useState([]);
  const pathname = usePathname();

  return <div>chat</div>;
};

export default Chat;
