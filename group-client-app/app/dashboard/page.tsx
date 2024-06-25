"use client";
import { useEffect, useState } from "react";
import UsersList from "../components/user/UsersList";
import SearchUsers from "../components/user/SearchUsers";
import { usePathname } from "next/navigation";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const pathname = usePathname();

  return (
    <div>
      {pathname === "/dashboard" ? (
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
      ) : (
        <div className="p-4 sm:ml-64"></div>
      )}
    </div>
  );
};

export default Dashboard;
