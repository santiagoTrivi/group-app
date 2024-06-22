"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { UserRepository } from "../user/services/user.respository";
import { Pagination } from "../shared/domain/pagination";
import UsersList from "../components/user/UsersList";
import SearchUsers from "../components/user/SearchUsers";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const { data: session } = useSession();

  return (
    <div>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <section>
            <SearchUsers
              getSearchResults={(results: any) => setData(results)}
            />
          </section>
          <div className="my-4">
            <UsersList users={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
